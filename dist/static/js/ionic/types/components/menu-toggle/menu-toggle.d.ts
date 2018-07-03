export declare class MenuToggle {
    doc: Document;
    visible: boolean;
    /**
     * Optional property that maps to a Menu's `menuId` prop. Can also be `left` or `right` for the menu side. This is used to find the correct menu to toggle
     */
    menu?: string;
    /**
     * Automatically hides the content when the corresponding menu is not
     * active
     */
    autoHide: boolean;
    componentDidLoad(): void;
    onClick(): Promise<boolean>;
    updateVisibility(): Promise<void>;
    hostData(): {
        class: {
            'menu-toggle-hidden': boolean;
        };
    };
}
