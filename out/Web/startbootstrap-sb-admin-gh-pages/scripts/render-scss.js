'use strict';
var autoprefixer = require('autoprefixer');
var fs = require('fs');
var packageJSON = require('../package.json');
var upath = require('upath');
var postcss = require('postcss');
var sass = require('sass');
var sh = require('shelljs');
var stylesPath = '../src/scss/styles.scss';
var destPath = upath.resolve(upath.dirname(__filename), '../dist/css/styles.css');
module.exports = function renderSCSS() {
    var results = sass.renderSync({
        data: entryPoint,
        includePaths: [
            upath.resolve(upath.dirname(__filename), '../node_modules')
        ]
    });
    var destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }
    postcss([autoprefixer]).process(results.css, { from: 'styles.css', to: 'styles.css' }).then(function (result) {
        result.warnings().forEach(function (warn) {
            console.warn(warn.toString());
        });
        fs.writeFileSync(destPath, result.css.toString());
    });
};
var entryPoint = "/*!\n* Start Bootstrap - " + packageJSON.title + " v" + packageJSON.version + " (" + packageJSON.homepage + ")\n* Copyright 2013-" + new Date().getFullYear() + " " + packageJSON.author + "\n* Licensed under " + packageJSON.license + " (https://github.com/StartBootstrap/" + packageJSON.name + "/blob/master/LICENSE)\n*/\n@import \"" + stylesPath + "\"\n";
