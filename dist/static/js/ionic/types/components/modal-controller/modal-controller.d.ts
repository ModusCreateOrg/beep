import { ModalOptions } from '../../interface';
import { OverlayController } from '../../utils/overlays';
export declare class ModalController implements OverlayController {
    private modals;
    doc: Document;
    protected modalWillPresent(ev: any): void;
    protected modalWillDismiss(ev: any): void;
    protected escapeKeyUp(): void;
    create(opts?: ModalOptions): Promise<HTMLIonModalElement>;
    dismiss(data?: any, role?: string, modalId?: number): Promise<void>;
    getTop(): HTMLIonModalElement;
}
