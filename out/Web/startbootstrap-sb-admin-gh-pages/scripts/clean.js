var sh = require('shelljs');
var upath = require('upath');
var destPath = upath.resolve(upath.dirname(__filename), '../dist');
sh.rm('-rf', destPath + "/*");
