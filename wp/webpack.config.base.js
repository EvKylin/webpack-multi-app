const paths = require('./paths');

module.exports = {
  entry: ['babel-polyfill', paths.appIndexJs],
  //entry: paths.appIndexJs,         // 单文件
  //entry: {app:paths.appIndexJs}, // 多文件
  output: {
    path: paths.appBuild,
    filename: 'dist/' + paths.platform + '/bundle.js',
    publicPath: "/"
  },
  module: {}
};