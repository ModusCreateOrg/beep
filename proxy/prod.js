const app = require('express')()
const request = require('request')

app.use('/', function(req, res) {
  const proxy = request({
    url: `https://${req.url.substr(1)}`,
    headers: { 'User-Agent': 'Beep' },
  })

  req.pipe(proxy).pipe(res)
})

module.exports = app
