export function attachComponent(delegate, container, component, cssClasses, componentProps) {
    if (delegate) {
        return delegate.attachViewToDom(container, component, componentProps, cssClasses);
    }
    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
        throw new Error('framework delegate is missing');
    }
    const el = (typeof component === 'string')
        ? container.ownerDocument.createElement(component)
        : component;
    cssClasses && cssClasses.forEach(c => el.classList.add(c));
    componentProps && Object.assign(el, componentProps);
    container.appendChild(el);
    if (el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve(el);
}
export function detachComponent(delegate, element) {
    if (element) {
        if (delegate) {
            const container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
        }
        element.remove();
    }
    return Promise.resolve();
}
