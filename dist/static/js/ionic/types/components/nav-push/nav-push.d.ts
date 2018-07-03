import { ComponentProps, NavComponent } from '../../interface';
export declare class NavPush {
    el: HTMLElement;
    component?: NavComponent;
    componentProps?: ComponentProps;
    push(): Promise<any>;
}
