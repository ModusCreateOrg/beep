const configBase = require('./wdio.conf');

exports.config = Object.assign({}, configBase.config, {
  host: 'hub',
  port: 4444,
  path: '/wd/hub',
  protocol: 'http',
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'firefox',
      specs: [],
      'moz:firefoxOptions': {
        // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
        // args: ['-headless']
      },
    },
    {
      maxInstances: 1,
      browserName: 'chrome',
      chromeOptions: {},
    },
  ],
});
