import capacitorConfig from '../capacitor.config.json'
import { Capacitor, Plugins, Device } from '@capacitor/core'
import helpers from './helpers'
const { Modals, Browser } = Plugins
const { NativeStorage, cordova } = window

const iOSAppId = 'id1434675665'
const DEV_ITUNES_URL = `https://itunes.apple.com/us/app/apple-store/${iOSAppId}`
const STORE_URL_FORMAT_IOS8 = `https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?pageNumber=0&sortOrdering=1&type=Purple+Software&mt=8&id=${iOSAppId}`
const STORE_URL_PREFIX_IOS9 = `https://itunes.apple.com/app/viewContentsUserReviews/${iOSAppId}?action=write-review`

const isWeb = Capacitor.platform === 'web'
const isIOS = Capacitor.platform === 'ios'
const storeReviewDoneStorageKey = 'storeReviewDone'

export default {
  storeReviewsEnabled: process.env.VUE_APP_STORE_REVIEWS_ENABLED === 'true',
  revisionsDone: 0,
  storeReviewDone: false,
  osVersion: 0,
  async init() {
    NativeStorage.getItem(storeReviewDoneStorageKey, value => (this.storeReviewDone = value))
    if (!isWeb && isIOS) {
      const deviceInfo = await Device.getInfo()
      const { osVersion } = deviceInfo
      this.osVersion = parseInt(osVersion.split('.')[0])
    }
  },
  getStoreHint() {
    switch (Capacitor.platform) {
      case 'ios':
        if (Capacitor.DEBUG) {
          return DEV_ITUNES_URL
        }
        if (this.osVersion < 9) {
          return STORE_URL_FORMAT_IOS8
        } else {
          return STORE_URL_PREFIX_IOS9
        }
      case 'android':
        return capacitorConfig.appId
    }
    return ''
  },
  registerReview() {
    this.revisionsDone++
  },
  tryPromptAppReview(forceReview = false) {
    // We only prompt for an app review if:
    // a. The feature is enabled
    // b. We are on a non web environment
    // c. The user has executed only one account/password review
    // d. The user has not accepted to provied a review for the app on the app stores yet
    // OR
    // a. The feature is enabled
    // b. The review request is forced (like when is triggered manually by the user, from a global menu for instance)
    if (
      this.storeReviewsEnabled &&
      !isWeb &&
      ((this.revisionsDone === 1 && !this.storeReviewDone) || forceReview)
    ) {
      this.doPromptAppReview()
    }
  },
  doPromptAppReview() {
    Modals.confirm({
      title: 'Have some feedback?',
      message: 'Do you want to review this app?',
      okButtonTitle: 'Sure',
      cancelButtonTitle: 'Not now',
    })
      .then(doReview => {
        if (doReview) {
          const url = this.getStoreHint()
          if (isIOS) {
            Browser.open({ url })
              .then(() => this.setReviewDone())
              .catch(helpers.err)
          } else {
            cordova.plugins.market.open(url)
            this.setReviewDone()
          }
        }
        return
      })
      .catch(helpers.err)
  },
  setReviewDone() {
    NativeStorage.setItem(storeReviewDoneStorageKey, true, () => {
      this.storeReviewDone = true
    })
  },
}
