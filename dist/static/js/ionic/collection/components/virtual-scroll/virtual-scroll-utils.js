const MIN_READS = 2;
export function updateVDom(dom, heightIndex, cells, range) {
    // reset dom
    for (const node of dom) {
        node.change = 0 /* NoChange */;
        node.d = true;
    }
    // try to match into exisiting dom
    const toMutate = [];
    const end = range.offset + range.length;
    for (let i = range.offset; i < end; i++) {
        const cell = cells[i];
        const node = dom.find((n) => n.d && n.cell === cell);
        if (node) {
            const top = heightIndex[i];
            if (top !== node.top) {
                node.top = top;
                node.change = 1 /* Position */;
            }
            node.d = false;
        }
        else {
            toMutate.push(cell);
        }
    }
    // needs to append
    const pool = dom.filter((n) => n.d);
    for (const cell of toMutate) {
        const node = pool.find(n => n.d && n.cell.type === cell.type);
        const index = cell.index;
        if (node) {
            node.d = false;
            node.change = 2 /* Cell */;
            node.cell = cell;
            node.top = heightIndex[index];
        }
        else {
            dom.push({
                d: false,
                cell: cell,
                visible: true,
                change: 2 /* Cell */,
                top: heightIndex[index],
            });
        }
    }
    dom
        .filter((n) => n.d && n.top !== -9999)
        .forEach((n) => {
        n.change = 1 /* Position */;
        n.top = -9999;
    });
}
export function doRender(el, nodeRender, dom, updateCellHeight) {
    const children = el.children;
    const childrenNu = children.length;
    let child;
    for (let i = 0; i < dom.length; i++) {
        const node = dom[i];
        const cell = node.cell;
        // the cell change, the content must be updated
        if (node.change === 2 /* Cell */) {
            if (i < childrenNu) {
                child = children[i];
                nodeRender(child, cell, i);
            }
            else {
                child = nodeRender(null, cell, i);
                child.classList.add('virtual-item');
                el.appendChild(child);
            }
            child['$ionCell'] = cell;
        }
        else {
            child = children[i];
        }
        // only update position when it changes
        if (node.change !== 0 /* NoChange */) {
            child.style.transform = `translate3d(0,${node.top}px,0)`;
        }
        // update visibility
        const visible = cell.visible;
        if (node.visible !== visible) {
            if (visible) {
                child.classList.remove('virtual-loading');
            }
            else {
                child.classList.add('virtual-loading');
            }
            node.visible = visible;
        }
        // dynamic height
        if (cell.reads > 0) {
            updateCellHeight(cell, child);
            cell.reads--;
        }
    }
}
export function getViewport(scrollTop, vierportHeight, margin) {
    return {
        top: Math.max(scrollTop - margin, 0),
        bottom: scrollTop + vierportHeight + margin
    };
}
export function getRange(heightIndex, viewport, buffer) {
    const topPos = viewport.top;
    const bottomPos = viewport.bottom;
    // find top index
    let i = 0;
    for (; i < heightIndex.length; i++) {
        if (heightIndex[i] > topPos) {
            break;
        }
    }
    const offset = Math.max(i - buffer - 1, 0);
    // find bottom index
    for (; i < heightIndex.length; i++) {
        if (heightIndex[i] >= bottomPos) {
            break;
        }
    }
    const end = Math.min(i + buffer, heightIndex.length);
    const length = end - offset;
    return { offset, length };
}
export function getShouldUpdate(dirtyIndex, currentRange, range) {
    const end = range.offset + range.length;
    return (dirtyIndex <= end ||
        currentRange.offset !== range.offset ||
        currentRange.length !== range.length);
}
export function findCellIndex(cells, index) {
    if (index === 0) {
        return 0;
    }
    return cells.findIndex(c => c.index === index);
}
export function inplaceUpdate(dst, src, offset) {
    if (offset === 0 && src.length >= dst.length) {
        return src;
    }
    for (let i = 0; i < src.length; i++) {
        dst[i + offset] = src[i];
    }
    return dst;
}
export function calcCells(items, itemHeight, headerFn, footerFn, approxHeaderHeight, approxFooterHeight, approxItemHeight, j, offset, len) {
    const cells = [];
    const end = len + offset;
    for (let i = offset; i < end; i++) {
        const item = items[i];
        if (headerFn) {
            const value = headerFn(item, i, items);
            if (value != null) {
                cells.push({
                    i: j++,
                    type: 1 /* Header */,
                    value: value,
                    index: i,
                    height: approxHeaderHeight,
                    reads: MIN_READS,
                    visible: false,
                });
            }
        }
        cells.push({
            i: j++,
            type: 0 /* Item */,
            value: item,
            index: i,
            height: itemHeight ? itemHeight(item, i) : approxItemHeight,
            reads: itemHeight ? 0 : MIN_READS,
            visible: !!itemHeight,
        });
        if (footerFn) {
            const value = footerFn(item, i, items);
            if (value != null) {
                cells.push({
                    i: j++,
                    type: 2 /* Footer */,
                    value: value,
                    index: i,
                    height: approxFooterHeight,
                    reads: 2,
                    visible: false,
                });
            }
        }
    }
    return cells;
}
export function calcHeightIndex(buf, cells, index) {
    let acum = buf[index];
    for (; index < buf.length; index++) {
        buf[index] = acum;
        acum += cells[index].height;
    }
    return acum;
}
export function resizeBuffer(buf, len) {
    if (!buf) {
        return new Uint32Array(len);
    }
    if (buf.length === len) {
        return buf;
    }
    else if (len > buf.length) {
        const newBuf = new Uint32Array(len);
        newBuf.set(buf);
        return newBuf;
    }
    else {
        return buf.subarray(0, len);
    }
}
export function positionForIndex(index, cells, heightIndex) {
    const cell = cells.find(cell => cell.type === 0 /* Item */ && cell.index === index);
    if (cell) {
        return heightIndex[cell.i];
    }
    return -1;
}
