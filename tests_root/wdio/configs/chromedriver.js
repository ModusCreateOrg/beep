const chromedriver = require('chromedriver')
const retry = require('p-retry')
const http = require('axios')

function start(config) {
  const pollUrl = `http://${config.host || 'localhost'}:${config.port || 4444}${config.path ||
    '/wd/hub'}/status`
  console.log('chromedriver starting on:', pollUrl)

  const proc = chromedriver.start([
    `--url-base=${config.path || '/wd/hub'}`,
    `--port=${config.port || 4444}`,
  ])
  process.on('exit', () => proc.kill())

  return retry(() => http.get(pollUrl), { retries: 5, minDelay: 200 })
}

function stop() {
  chromedriver.stop()
}

module.exports = {
  start,
  stop,
}
