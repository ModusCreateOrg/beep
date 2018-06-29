export async function writeNavState(root, chain, intent, index, changed = false) {
    try {
        // find next navigation outlet in the DOM
        const outlet = searchNavNode(root);
        // make sure we can continue interating the DOM, otherwise abort
        if (index >= chain.length || !outlet) {
            return changed;
        }
        await outlet.componentOnReady();
        const route = chain[index];
        const result = await outlet.setRouteId(route.id, route.params, intent);
        // if the outlet changed the page, reset navigation to neutral (no direction)
        // this means nested outlets will not animate
        if (result.changed) {
            intent = 0 /* None */;
            changed = true;
        }
        // recursivelly set nested outlets
        changed = await writeNavState(result.element, chain, intent, index + 1, changed);
        // once all nested outlets are visible let's make the parent visible too,
        // using markVisible prevents flickering
        if (result.markVisible) {
            await result.markVisible();
        }
        return changed;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
export function readNavState(root) {
    const ids = [];
    let outlet;
    let node = root;
    while (true) {
        outlet = searchNavNode(node);
        if (outlet) {
            const id = outlet.getRouteId();
            if (id) {
                node = id.element;
                id.element = undefined;
                ids.push(id);
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }
    return { ids, outlet };
}
export function waitUntilNavNode(win) {
    if (searchNavNode(win.document.body)) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        win.addEventListener('ionNavWillLoad', resolve, { once: true });
    });
}
const QUERY = ':not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet';
function searchNavNode(root) {
    if (!root) {
        return undefined;
    }
    if (root.matches(QUERY)) {
        return root;
    }
    const outlet = root.querySelector(QUERY);
    return outlet ? outlet : undefined;
}
