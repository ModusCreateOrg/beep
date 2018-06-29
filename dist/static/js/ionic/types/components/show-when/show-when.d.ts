import { Config, Mode } from '../../interface';
import { DisplayWhen, PlatformConfig } from '../../utils/show-hide-when-utils';
export declare class ShowWhen implements DisplayWhen {
    mode: Mode;
    element?: HTMLElement;
    config: Config;
    calculatedPlatforms: PlatformConfig[];
    win: Window;
    orientation?: string;
    mediaQuery?: string;
    size?: string;
    platform?: string;
    or: boolean;
    passesTest: boolean;
    componentWillLoad(): void;
    onResize(): void;
    hostData(): {
        class: {
            'show-content': boolean;
            'hide-content': boolean;
        };
    };
}
