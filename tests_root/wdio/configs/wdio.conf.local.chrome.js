const configBase = require('./wdio.conf')

exports.config = Object.assign({}, configBase.config, {
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
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
