'use strict';
var fs = require('fs');
var upath = require('upath');
var sh = require('shelljs');
module.exports = function renderAssets() {
    var sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    var destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    sh.cp('-R', sourcePath, destPath);
};
