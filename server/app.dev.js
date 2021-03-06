'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.dev');

const app = feathers();
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( path.join(app.get('assets'), 'favicon.ico') ))
  .use('/', serveStatic(app.get('public')))
  .use('/assets', serveStatic(app.get('assets')))
  .use('/login', serveHtml)
  .use('/logout', serveHtml)
  .use('/watch', serveHtml)
  .use('/favorite', serveHtml)
  .use('/history', serveHtml)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

module.exports = app;

function serveHtml(req, res) {
  const html = path.join('.', 'index.html');
  res.sendFile(html, { root: 'public' });
}
