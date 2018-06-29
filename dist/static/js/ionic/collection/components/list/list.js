export class List {
    /**
     * Get the [Item Sliding](../../item-sliding/ItemSliding) that is currently opene.
     */
    getOpenItem() {
        return this.openItem;
    }
    /**
     * Set an [Item Sliding](../../item-sliding/ItemSliding) as the open item.
     */
    setOpenItem(itemSliding) {
        this.openItem = itemSliding;
    }
    /**
     * Close the sliding items. Items can also be closed from the [Item Sliding](../../item-sliding/ItemSliding).
     * Returns a boolean value of whether it closed an item or not.
     */
    closeSlidingItems() {
        if (this.openItem) {
            this.openItem.close();
            this.openItem = undefined;
            return true;
        }
        return false;
    }
    hostData() {
        return {
            class: {
                [`list-lines-${this.lines}`]: !!this.lines,
                [`list-${this.mode}-lines-${this.lines}`]: !!this.lines
            }
        };
    }
    static get is() { return "ion-list"; }
    static get host() { return {
        "theme": "list"
    }; }
    static get properties() { return {
        "closeSlidingItems": {
            "method": true
        },
        "getOpenItem": {
            "method": true
        },
        "lines": {
            "type": String,
            "attr": "lines"
        },
        "setOpenItem": {
            "method": true
        }
    }; }
    static get style() { return "/**style-placeholder:ion-list:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-list:**/"; }
}
