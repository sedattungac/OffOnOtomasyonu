'use strict';
var upath = require('upath');
var sh = require('shelljs');
var renderPug = require('./render-pug');
var srcPath = upath.resolve(upath.dirname(__filename), '../src');
sh.find(srcPath).forEach(_processFile);
function _processFile(filePath) {
    if (filePath.match(/\.pug$/)
        && !filePath.match(/include/)
        && !filePath.match(/mixin/)
        && !filePath.match(/\/pug\/layouts\//)) {
        renderPug(filePath);
    }
}
