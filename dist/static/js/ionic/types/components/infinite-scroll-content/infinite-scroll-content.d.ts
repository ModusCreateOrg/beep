import '../../stencil.core';
import { Config } from '../../interface';
export declare class InfiniteScrollContent {
    config: Config;
    /**
     * An animated SVG spinner that shows while loading.
     */
    loadingSpinner?: string;
    /**
     * Optional text to display while loading.
     */
    loadingText?: string;
    componentDidLoad(): void;
    render(): JSX.Element;
}
