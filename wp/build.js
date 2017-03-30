/**
 * Created by QiHan Wang on 2017/1/23.
 */
const ora = require('ora');
const shell = require('shelljs');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.prod');
const paths = require('./paths');

//process.env.NODE_ENV = 'production';

const spinner = ora('building for production...');
spinner.start();

// 删除之前打包
shell.rm('-rf', paths.appBuild)    // 删除目录
shell.mkdir('-p', paths.appBuild)  // 当前目录下创建目录
//shell.cp('-R', 'static/*', paths.appBuild)  // 复制目录

webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
});
