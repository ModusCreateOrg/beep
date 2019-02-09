const app = require('express')()
const request = require('request')
const port = process.env.PROXY_PORT || 5000

app.listen(port, () => console.log(`[BEEP] Proxy server listening on port ${port}\n`))

app.use('/', function(req, res) {
  const proxy = request({
    url: `https://${req.url.substr(1)}`,
    headers: { 'User-Agent': 'Beep' },
  })

  req.pipe(proxy).pipe(res)
})
