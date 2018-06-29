import '../../stencil.core';
import { Mode, SelectPopoverOption } from '../../interface';
export declare class SelectPopover {
    mode: Mode;
    header?: string;
    subHeader?: string;
    message?: string;
    options: SelectPopoverOption[];
    onSelect(ev: any): void;
    render(): JSX.Element;
}
