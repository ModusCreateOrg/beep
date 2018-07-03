import { ToastOptions } from '../../interface';
import { OverlayController } from '../../utils/overlays';
export declare class ToastController implements OverlayController {
    private toasts;
    doc: Document;
    protected toastWillPresent(ev: any): void;
    protected toastWillDismiss(ev: any): void;
    protected escapeKeyUp(): void;
    create(opts?: ToastOptions): Promise<HTMLIonToastElement>;
    dismiss(data?: any, role?: string, toastId?: number): Promise<void>;
    getTop(): HTMLIonToastElement;
}
