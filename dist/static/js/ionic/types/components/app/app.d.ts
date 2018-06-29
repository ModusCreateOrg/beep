import '../../stencil.core';
import { Config, Mode } from '../../interface';
export declare class App {
    mode: Mode;
    el: HTMLElement;
    win: Window;
    config: Config;
    componentDidLoad(): void;
    hostData(): {
        class: {
            [x: string]: boolean;
            'statusbar-padding': boolean;
        };
    };
    render(): JSX.Element[];
}
