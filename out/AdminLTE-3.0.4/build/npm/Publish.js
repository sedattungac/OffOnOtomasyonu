var Plugins = require('./Plugins');
var fse = require('fs-extra');
var Publish = /** @class */ (function () {
    function Publish() {
        this.options = {
            verbose: false
        };
        this.getArguments();
    }
    Publish.prototype.getArguments = function () {
        if (process.argv.length > 2) {
            var arg = process.argv[2];
            switch (arg) {
                case '-v':
                case '--verbose':
                    this.options.verbose = true;
                    break;
                default:
                    throw new Error("Unknown option " + arg);
            }
        }
    };
    Publish.prototype.run = function () {
        var _this = this;
        // Publish files
        Plugins.forEach(function (module) {
            try {
                if (fse.existsSync(module.from)) {
                    fse.copySync(module.from, module.to);
                }
                else {
                    fse.copySync(module.from.replace('node_modules/', '../'), module.to);
                }
                if (_this.options.verbose) {
                    console.log("Copied " + module.from + " to " + module.to);
                }
            }
            catch (err) {
                console.error("Error: " + err);
            }
        });
    };
    return Publish;
}());
(new Publish()).run();
