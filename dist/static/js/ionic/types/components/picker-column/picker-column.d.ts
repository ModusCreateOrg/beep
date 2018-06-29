import '../../stencil.core';
import { Mode, PickerColumn, QueueController } from '../../interface';
export declare class PickerColumnCmp {
    mode: Mode;
    private bounceFrom;
    private lastIndex?;
    private lastTempIndex?;
    private minY;
    private maxY;
    private optHeight;
    private pos;
    private rotateFactor;
    private scaleFactor;
    private startY?;
    private velocity;
    private y;
    el: HTMLElement;
    queue: QueueController;
    col: PickerColumn;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private optClick(ev, index);
    private setSelected(selectedIndex, duration);
    private update(y, duration, saveY, emitChange);
    private decelerate();
    private canStart();
    private onDragStart(detail);
    private onDragMove(detail);
    private onDragEnd(detail);
    private refresh();
    hostData(): {
        class: {
            'picker-opts-left': boolean;
            'picker-opts-right': boolean;
        };
        style: {
            'max-width': string | undefined;
        };
    };
    render(): JSX.Element[];
}
export declare const PICKER_OPT_SELECTED = "picker-opt-selected";
export declare const DECELERATION_FRICTION = 0.97;
export declare const FRAME_MS: number;
export declare const MAX_PICKER_SPEED = 60;
