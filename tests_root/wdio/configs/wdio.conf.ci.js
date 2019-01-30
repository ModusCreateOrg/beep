const configBase = require('./wdio.conf')

exports.config = Object.assign({}, configBase.config, {
  capabilities: [
    {
      maxInstances: 3,
      browserName: 'chrome',
      chromeOptions:
      {
        args: ['--headless', '--disable-gpu'],
      }
    },
  ],
  onPrepare: () => {
    if (this.config.chromeDriver) {
      require('./chromedriver').start(this.config)
    }
  },
  after: () => {
    if (this.config.chromeDriver) {
      require('./chromedriver').stop()
    }
  },
  chromeDriver: true,
})
