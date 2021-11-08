'use strict';
var fs = require('fs');
var packageJSON = require('../package.json');
var upath = require('upath');
var sh = require('shelljs');
module.exports = function renderScripts() {
    var sourcePath = upath.resolve(upath.dirname(__filename), '../src/js');
    var destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    sh.cp('-R', sourcePath, destPath);
    var sourcePathScriptsJS = upath.resolve(upath.dirname(__filename), '../src/js/scripts.js');
    var destPathScriptsJS = upath.resolve(upath.dirname(__filename), '../dist/js/scripts.js');
    var copyright = "/*!\n    * Start Bootstrap - " + packageJSON.title + " v" + packageJSON.version + " (" + packageJSON.homepage + ")\n    * Copyright 2013-" + new Date().getFullYear() + " " + packageJSON.author + "\n    * Licensed under " + packageJSON.license + " (https://github.com/StartBootstrap/" + packageJSON.name + "/blob/master/LICENSE)\n    */\n    ";
    var scriptsJS = fs.readFileSync(sourcePathScriptsJS);
    fs.writeFileSync(destPathScriptsJS, copyright + scriptsJS);
};
