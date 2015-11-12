var gzippo = require('gzippo')
var express = require('express')
var app = express()

app.use(gzippo.staticGzip("" + __dirname))
app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'))
})
