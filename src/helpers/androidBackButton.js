export default {
  router: {},
  init(router) {
    this.router = router
    this._addEventListener()
  },
  destroy() {
    document.removeEventListener('backbutton', this._handleClick)
  },
  _addEventListener() {
    document.addEventListener('backbutton', this._handleClick)
  },
  _handleClick() {
    if (!this._hasOpenModals()) {
      this.router.back()
    }
  },
  _hasOpenModals() {
    return document.getElementsByTagName('ion-modal').length > 0
  },
}
