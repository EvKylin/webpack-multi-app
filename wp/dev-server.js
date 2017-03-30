/**
 * Created by QiHan Wang on 2017/1/23.
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackCfg = require('./webpack.config.dev');
const paths = require('./paths');
const compiler = webpack(webpackCfg);
const opn = require('opn');

const server = new webpackDevServer(compiler, {
  publicPath: webpackCfg.output.publicPath,
  clientLogLevel: 'none',
  contentBase: './' + paths.appPublic + '/',
  hot: true,
  noInfo: false,
  compress: true,
  port: 8080,
  //quiet: true,
  //watchOptions: {ignored: /node_modules/},
  stats: 'normal'
});
server.listen(8080, '10.10.12.85', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  const uri = 'http://10.10.12.85:8080';
  console.log('Listening at ' + uri + '\n');

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
});
