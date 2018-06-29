/**
 * Check to see if the Haptic Plugin is available
 * @return Returns true or false if the plugin is available
 */
export function hapticAvailable() {
    const engine = window.TapticEngine;
    return !!engine;
}
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
export function hapticSelection() {
    const engine = window.TapticEngine;
    engine && engine.selection();
}
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
export function hapticSelectionStart() {
    const engine = window.TapticEngine;
    engine && engine.gestureSelectionStart();
}
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
export function hapticSelectionChanged() {
    const engine = window.TapticEngine;
    engine && engine.gestureSelectionChanged();
}
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
export function hapticSelectionEnd() {
    const engine = window.TapticEngine;
    engine && engine.gestureSelectionEnd();
}
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ type: 'success' }` (or `warning`/`error`)
 */
export function hapticNotification(options) {
    const engine = window.TapticEngine;
    engine && engine.notification(options);
}
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
 */
export function hapticImpact(options) {
    const engine = window.TapticEngine;
    engine && engine.impact(options);
}
