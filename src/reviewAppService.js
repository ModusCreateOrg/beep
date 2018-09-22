import capacitorConfig from '../capacitor.config.json'
import { Capacitor, Plugins, Device } from '@capacitor/core'
import helpers from './helpers'
const { Modals, Browser, Storage } = Plugins
const { cordova } = window

const iOSAppId = helpers.iOSAppId()
const DEV_ITUNES_URL = `https://itunes.apple.com/us/app/apple-store/${iOSAppId}`
const STORE_URL_FORMAT_IOS8 = `https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?pageNumber=0&sortOrdering=1&type=Purple+Software&mt=8&id=${iOSAppId}`
const STORE_URL_PREFIX_IOS9 = `https://itunes.apple.com/app/viewContentsUserReviews/${iOSAppId}?action=write-review`
const storeReviewDoneStorageKey = 'storeReviewDone'

export default {
  storeReviewsEnabled: helpers.storeReviewsEnabled(),
  revisionsDone: 0,
  storeReviewDone: false,
  storeReviewRejected: false,
  osVersion: 0,
  async init() {
    this.storeReviewDone = (await Storage.get({ key: storeReviewDoneStorageKey })).value === 'true'
    if (!helpers.isWeb() && helpers.isIOS()) {
      const deviceInfo = await Device.getInfo()
      const { osVersion } = deviceInfo
      this.osVersion = parseInt(osVersion.split('.')[0])
    }
  },
  getStoreHint() {
    switch (Capacitor.platform) {
      case 'ios':
        return this.getiOSStoreHint()
      case 'android':
        return capacitorConfig.appId
    }
    return ''
  },
  getiOSStoreHint() {
    if (Capacitor.DEBUG) {
      return DEV_ITUNES_URL
    }
    if (this.osVersion < 9) {
      return STORE_URL_FORMAT_IOS8
    } else {
      return STORE_URL_PREFIX_IOS9
    }
  },
  registerCheck() {
    this.revisionsDone++
  },
  tryPromptAppReview(forceReview = false) {
    // We only prompt for an app review if:
    // a. The feature is enabled
    // b. We are on a non web environment
    // c. The user has executed only one account/password review
    // d. The user has not accepted or rejected to provied a review for the app on the app stores yet
    // OR
    // a. The feature is enabled
    // b. The review request is forced (like when is triggered manually by the user, from a global menu for instance)
    if (
      this.storeReviewsEnabled &&
      !helpers.isWeb() &&
      ((this.revisionsDone === 1 && !this.storeReviewDone && !this.storeReviewRejected) ||
        forceReview)
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
      .then(({ value }) => {
        if (value) {
          this.suggestAppReview()
        } else {
          this.storeReviewRejected = true
        }
        return
      })
      .catch(helpers.err)
  },
  async suggestAppReview() {
    const url = this.getStoreHint()
    if (helpers.isIOS()) {
      await Browser.open({ url })
      this.setReviewDone()
    } else {
      cordova.plugins.market.open(url)
      this.setReviewDone()
    }
  },
  async setReviewDone() {
    await Storage.set({
      key: storeReviewDoneStorageKey,
      value: 'true',
    })
    this.storeReviewDone = true
  },
}
