"use strict";
exports.__esModule = true;
var rollup_plugin_babel_1 = require("rollup-plugin-babel");
var pkg = require('../../package');
var year = new Date().getFullYear();
var globals = {
    jquery: 'jQuery'
};
exports["default"] = {
    input: 'build/js/AdminLTE.js',
    output: {
        banner: "/*!\n * AdminLTE v" + pkg.version + " (" + pkg.homepage + ")\n * Copyright 2014-" + year + " " + pkg.author + "\n * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)\n */",
        file: 'dist/js/adminlte.js',
        format: 'umd',
        globals: globals,
        name: 'adminlte'
    },
    plugins: [
        rollup_plugin_babel_1["default"]({
            exclude: 'node_modules/**',
            externalHelpers: true
        })
    ]
};
