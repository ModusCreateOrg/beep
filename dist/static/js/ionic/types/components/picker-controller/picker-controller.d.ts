import { PickerOptions } from '../../interface';
import { OverlayController } from '../../utils/overlays';
export declare class PickerController implements OverlayController {
    private pickers;
    doc: Document;
    protected pickerWillPresent(ev: any): void;
    protected pickerWillDismiss(ev: any): void;
    protected escapeKeyUp(): void;
    create(opts?: PickerOptions): Promise<HTMLIonPickerElement>;
    dismiss(data?: any, role?: string, pickerId?: number): Promise<void>;
    getTop(): HTMLIonPickerElement;
}
