import { LoadingOptions } from '../../interface';
import { OverlayController } from '../../utils/overlays';
export declare class LoadingController implements OverlayController {
    private loadings;
    doc: Document;
    protected loadingWillPresent(ev: any): void;
    protected loadingWillDismiss(ev: any): void;
    protected escapeKeyUp(): void;
    create(opts?: LoadingOptions): Promise<HTMLIonLoadingElement>;
    dismiss(data?: any, role?: string, loadingId?: number): Promise<void>;
    getTop(): HTMLIonLoadingElement;
}
