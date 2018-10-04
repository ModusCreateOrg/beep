import capacitorConfig from '../capacitor.config.json'
import { Capacitor, Plugins, Device } from '@capacitor/core'
import helpers from './helpers'
const { Browser, Storage } = Plugins
const { cordova } = window

const iOSAppId = helpers.iOSAppId()
const DEV_ITUNES_URL = `https://itunes.apple.com/us/app/apple-store/${iOSAppId}`
const STORE_URL_FORMAT_IOS8 = `https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?pageNumber=0&sortOrdering=1&type=Purple+Software&mt=8&id=${iOSAppId}`
const STORE_URL_PREFIX_IOS9 = `https://itunes.apple.com/app/viewContentsUserReviews/${iOSAppId}?action=write-review`
const storeReviewDoneStorageKey = 'storeReviewDone'
const supportEmail = helpers.env('SUPPORT_EMAIL')
const supportEmailSubject = helpers.env('SUPPORT_EMAIL_SUBJECT')

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
  shouldPromptAppReview() {
    // We only prompt for an app review if:
    // a. The feature is enabled
    // b. The user has executed only one account/password review
    // c. The user has not accepted or rejected to provied a review for the app on the app stores yet
    return (
      this.storeReviewsEnabled &&
      this.revisionsDone === 1 &&
      !this.storeReviewDone &&
      !this.storeReviewRejected
    )
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
    return Promise.resolve()
  },
  async setReviewDone() {
    await Storage.set({
      key: storeReviewDoneStorageKey,
      value: 'true',
    })
    this.storeReviewDone = true
  },
  async provideAppFeedback() {
    await this.setReviewDone()
    window.location.href = `mailto:${supportEmail}?subject=${supportEmailSubject}`
  },
}
