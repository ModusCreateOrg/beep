import { ComponentRef, FrameworkDelegate } from '../interface';
export declare function attachComponent(delegate: FrameworkDelegate | undefined, container: Element, component: ComponentRef, cssClasses?: string[], componentProps?: {
    [key: string]: any;
}): Promise<HTMLElement>;
export declare function detachComponent(delegate: FrameworkDelegate | undefined, element: HTMLElement | undefined): Promise<void>;
