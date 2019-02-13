import helpers from './helpers'

export default {
  breaches: [],
  filter: '',
  account: '',
  baseApiURL: helpers.env('PROXY_HOST') + '/api/v2/breachedaccount/',
  clear() {
    this.breaches = []
    this.filter = ''
    this.account = ''
  },
  formatDomain(domain) {
    return domain.startsWith('www') ? domain : `www.${domain}`
  },
  formatDate(d) {
    const date = new Date(d)
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
  },
}
