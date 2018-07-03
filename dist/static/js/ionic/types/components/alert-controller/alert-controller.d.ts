import { AlertOptions } from '../../interface';
import { OverlayController } from '../../utils/overlays';
export declare class AlertController implements OverlayController {
    private alerts;
    doc: Document;
    protected alertWillPresent(ev: any): void;
    protected alertWillDismiss(ev: any): void;
    protected escapeKeyUp(): void;
    create(opts?: AlertOptions): Promise<HTMLIonAlertElement>;
    dismiss(data?: any, role?: string, alertId?: number): Promise<void>;
    getTop(): HTMLIonAlertElement;
}
