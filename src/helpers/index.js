import { Capacitor } from '@capacitor/core'

const isProd = process.env.NODE_ENV === 'production'

export default {
  /*
   * Check if running in a production environment
   */
  isProd,

  /*
   * Get constants defined in .env through the Vue Service
   * @param {String} constant - name of constant to be returned
   */
  env(constant) {
    return process.env[`VUE_APP_${constant}`]
  },

  /*
   * Write message to console
   * @param {String} msg - message of the log
   */
  log(msg) {
    notify('log', msg)
  },

  /*
   * Write warning to console
   * @param {String} msg - message of the warning
   */
  warn(msg) {
    notify('warn', msg)
  },

  /*
   * Write error to console
   * @param {String} msg - message of the error
   */
  err(msg) {
    notify('error', msg)
  },

  /*
   * Check is reviews on apps stores feature is enabled
   */
  storeReviewsEnabled() {
    return this.env('STORE_REVIEWS_ENABLED') === 'true'
  },

  /*
   * Return iOS app id
   */
  iOSAppId() {
    return this.env('IOS_APP_ID')
  },

  /*
   * Check is the app is running into a web environment
   */
  isWeb() {
    return Capacitor.platform === 'web'
  },

  /*
   * Check is the app is running into an iOS environment
   */
  isIOS() {
    return Capacitor.platform === 'ios'
  },
}

/*
 * Abstract notifier
 * @param {String} method - type of notification
 * @param {String} msg - message to be written
 */
function notify(method, msg) {
  if (console && !isProd) {
    console[method](`[BEEP] ${msg}`)
  }
}
