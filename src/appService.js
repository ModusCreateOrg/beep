import { version as appVersion } from '../package.json'
import { Plugins } from '@capacitor/core'
const { Storage } = Plugins
const lastMajorAppVersionStorageKey = 'lastMajorAppVersion'

export default {
  currentMajorAppVersion: 0,
  lastMajorAppVersion: 0,
  isMajorUpdate: false,
  async init() {
    this.currentMajorAppVersion = this.getCurrentAppMajorVersion()
    this.lastMajorAppVersion = await this.getLastAppMajorVersion()
    this.isMajorUpdate = this.currentMajorAppVersion > this.lastMajorAppVersion
    if (this.isMajorUpdate || this.currentMajorAppVersion === 0) {
      Storage.set({
        key: lastMajorAppVersionStorageKey,
        value: this.currentMajorAppVersion.toString(),
      })
    }
  },
  getCurrentAppMajorVersion() {
    return parseInt(appVersion.split('.')[0])
  },
  async getLastAppMajorVersion() {
    const lastMajorAppVersionData = await Storage.get({ key: lastMajorAppVersionStorageKey })
    if (lastMajorAppVersionData && lastMajorAppVersionData.value) {
      return parseInt(lastMajorAppVersionData.value)
    }
    return 0
  },
}
