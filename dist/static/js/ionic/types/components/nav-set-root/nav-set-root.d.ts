import { ComponentProps, NavComponent } from '../../interface';
export declare class NavSetRoot {
    el: HTMLElement;
    component?: NavComponent;
    componentProps?: ComponentProps;
    push(): Promise<any>;
}
