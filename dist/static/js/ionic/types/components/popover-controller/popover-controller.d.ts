import { PopoverOptions } from '../../interface';
import { OverlayController } from '../../utils/overlays';
export declare class PopoverController implements OverlayController {
    private popovers;
    doc: Document;
    protected popoverWillPresent(ev: any): void;
    protected popoverWillDismiss(ev: any): void;
    protected escapeKeyUp(): void;
    create(opts?: PopoverOptions): Promise<HTMLIonPopoverElement>;
    dismiss(data?: any, role?: string, popoverId?: number): Promise<void>;
    getTop(): HTMLIonPopoverElement;
}
