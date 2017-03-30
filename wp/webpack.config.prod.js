/**
 * Created by QiHan Wang on 2017/2/3.
 */
const paths = require('./paths');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = merge(webpackBase, {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [paths.appPublic]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize&importLoaders=1&sourceMap!postcss-loader!sass-loader?sourceMap'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize&importLoaders=1&sourceMap!postcss-loader!less-loader?sourceMap'
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  output: {
    path: paths.appBuild,
    publicPath: './',  // 打包文件采用相对地址
    filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[id].[chunkhash:5].js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: '"production"'
      }
     }),
    new webpack.optimize.UglifyJsPlugin({
      //beautify: false,             // 最紧凑输出
      //comments: false,             // 删除所有注释
      compress: {
        warnings: false,             //  在UglifyJS 删除没有用到的代码是输出警告
        //drop_console: true,          // 删除所有'console' 语句，并可以兼容IE
        //collapse_vars: true,         // 内嵌定义了但是只用到一次的变量
        //reduce_vars: true,           // 提取出出现多次但是没有定义成变量去引用的静态值
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({filename: 'css/[name].[contenthash:5].css'}),
    new HtmlWebpackPlugin({
      filename: paths.buildHtml,
      template: paths.appHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
});
module.exports = webpackConfig;
