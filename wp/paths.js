/**
 * Created by QiHan Wang on 2017/1/23.
 */

const path = require('path');
const fs = require('fs');

const plat = ['expert', 'expertRouter'];

const platform = plat[0];

const appDirectory = fs.realpathSync(process.cwd()); // 当前根目录
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

const nodePaths = (process.env.NODE_PATH || '')
    .split(process.platform === 'win32' ? ';' : ':')
    .filter(Boolean)
    .map(resolveApp);

module.exports = {
    platform: platform,
    appBuild: resolveApp('dist/' + platform),
    appPublic: resolveApp('app/' + platform),
    appHtml: resolveApp('app/' + platform + '/index.html'),
    buildHtml: resolveApp('dist/' + platform + '/index.html'),
    appIndexJs: resolveApp('app/' + platform + '/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('app/' + platform),
    testsSetup: resolveApp('app/setupTests.js'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveApp('node_modules'),
    nodePaths: nodePaths
};