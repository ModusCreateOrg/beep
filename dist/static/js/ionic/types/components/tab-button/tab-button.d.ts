import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Mode } from '../../interface';
export declare class TabButton {
    el: HTMLElement;
    mode: Mode;
    keyFocus: boolean;
    selected: boolean;
    tab: HTMLIonTabElement;
    ionTabbarClick: EventEmitter<HTMLIonTabElement>;
    ionTabButtonDidLoad: EventEmitter<void>;
    ionTabButtonDidUnload: EventEmitter<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onClick(ev: UIEvent): void;
    private onKeyUp();
    private onBlur();
    hostData(): {
        'role': string;
        'id': string;
        'aria-selected': boolean;
        'hidden': boolean;
        class: {
            'tab-selected': boolean;
            'has-title': boolean;
            'has-icon': boolean;
            'has-title-only': boolean;
            'has-icon-only': boolean;
            'has-badge': boolean;
            'tab-btn-disabled': boolean;
            'focused': boolean;
        };
    };
    render(): JSX.Element[];
}
