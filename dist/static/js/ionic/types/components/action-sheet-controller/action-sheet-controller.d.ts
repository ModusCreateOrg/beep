import { ActionSheetOptions } from '../../interface';
import { OverlayController } from '../../utils/overlays';
export declare class ActionSheetController implements OverlayController {
    private actionSheets;
    doc: Document;
    protected actionSheetWillPresent(ev: any): void;
    protected actionSheetWillDismiss(ev: any): void;
    protected escapeKeyUp(): void;
    create(opts?: ActionSheetOptions): Promise<HTMLIonActionSheetElement>;
    dismiss(data?: any, role?: string, actionSheetId?: number): Promise<void>;
    getTop(): HTMLIonActionSheetElement;
}
