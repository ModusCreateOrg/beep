import { Config, Mode } from '../../interface';
import { DisplayWhen, PlatformConfig } from '../../utils/show-hide-when-utils';
export declare class HideWhen implements DisplayWhen {
    mode: Mode;
    calculatedPlatforms: PlatformConfig[];
    element: HTMLElement;
    config: Config;
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
