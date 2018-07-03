export declare class List {
    private mode;
    private openItem?;
    /**
     * How the bottom border should be displayed on all items.
     */
    lines?: 'full' | 'inset' | 'none';
    /**
     * Get the [Item Sliding](../../item-sliding/ItemSliding) that is currently opene.
     */
    getOpenItem(): HTMLIonItemSlidingElement | undefined;
    /**
     * Set an [Item Sliding](../../item-sliding/ItemSliding) as the open item.
     */
    setOpenItem(itemSliding: HTMLIonItemSlidingElement | undefined): void;
    /**
     * Close the sliding items. Items can also be closed from the [Item Sliding](../../item-sliding/ItemSliding).
     * Returns a boolean value of whether it closed an item or not.
     */
    closeSlidingItems(): boolean;
    hostData(): {
        class: {
            [x: string]: boolean;
        };
    };
}
