/**
 * Check to see if the Haptic Plugin is available
 * @return Returns true or false if the plugin is available
 */
export declare function hapticAvailable(): boolean;
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
export declare function hapticSelection(): void;
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
export declare function hapticSelectionStart(): void;
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
export declare function hapticSelectionChanged(): void;
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
export declare function hapticSelectionEnd(): void;
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ type: 'success' }` (or `warning`/`error`)
 */
export declare function hapticNotification(options: {
    type: string;
}): void;
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
 */
export declare function hapticImpact(options: {
    style: string;
}): void;
