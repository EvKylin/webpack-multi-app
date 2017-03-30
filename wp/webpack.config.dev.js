const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBase = require('./webpack.config.base');
const paths = require('./paths');

const cfg = Object.assign(webpackBase, {devtool: 'cheap-module-eval-source-map'});


// 配置多个文件
/*Object.getOwnPropertyNames((webpackBase.entry || {})).map(name =>
 cfg.entry = []
 .concat('webpack-dev-server/client?/')
 .concat('webpack/hot/dev-server')
 //.concat(require.resolve('webpack-dev-server/client') + '?/')
 //.concat(require.resolve('webpack/hot/dev-server'))
 .concat(webpackBase.entry[name])
 );*/

// 配置单文件
cfg.entry = ['webpack-dev-server/client?/', 'webpack/hot/dev-server', ...webpackBase.entry];

// add hot-reload related code to entry chunks
/*Object.keys(webpackBase.entry).forEach(function (name) {
  webpackBase.entry[name] = ['./build/dev-client'].concat(webpackBase.entry[name])
})*/

cfg.module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [paths.appPublic]
    },
    {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }
  ]
};

// Plugins
cfg.plugins = (webpackBase.plugins || []).concat(
  new webpack.DefinePlugin({
    'process.env': {NODE_EVN:'"development"'}
  }),
  //new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  //new webpack.NoErrorsPlugin()
  new HtmlWebpackPlugin({inject: true, template: paths.appHtml})
);

module.exports = cfg;