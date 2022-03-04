const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
const path = require('path')
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'))
app.disable('x-powered-by')
app.use(staticFileMiddleware)
app.use(history({
  disableDotRule: true,
  verbose: true
}))
app.use(staticFileMiddleware)
const port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
