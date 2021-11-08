"use strict";
/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var PushMenu = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'PushMenu';
    var DATA_KEY = 'lte.pushmenu';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
        COLLAPSED: "collapsed" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY
    };
    var Default = {
        autoCollapseSize: 992,
        enableRemember: false,
        noTransitionAfterReload: true
    };
    var Selector = {
        TOGGLE_BUTTON: '[data-widget="pushmenu"]',
        SIDEBAR_MINI: '.sidebar-mini',
        SIDEBAR_COLLAPSED: '.sidebar-collapse',
        BODY: 'body',
        OVERLAY: '#sidebar-overlay',
        WRAPPER: '.wrapper'
    };
    var ClassName = {
        COLLAPSED: 'sidebar-collapse',
        OPEN: 'sidebar-open',
        CLOSED: 'sidebar-closed'
    };
    /**
     * Class Definition
     * ====================================================
     */
    var PushMenu = /** @class */ (function () {
        function PushMenu(element, options) {
            this._element = element;
            this._options = $.extend({}, Default, options);
            if (!$(Selector.OVERLAY).length) {
                this._addOverlay();
            }
            this._init();
        }
        // Public
        PushMenu.prototype.expand = function () {
            if (this._options.autoCollapseSize) {
                if ($(window).width() <= this._options.autoCollapseSize) {
                    $(Selector.BODY).addClass(ClassName.OPEN);
                }
            }
            $(Selector.BODY).removeClass(ClassName.COLLAPSED).removeClass(ClassName.CLOSED);
            if (this._options.enableRemember) {
                localStorage.setItem("remember" + EVENT_KEY, ClassName.OPEN);
            }
            var shownEvent = $.Event(Event.SHOWN);
            $(this._element).trigger(shownEvent);
        };
        PushMenu.prototype.collapse = function () {
            if (this._options.autoCollapseSize) {
                if ($(window).width() <= this._options.autoCollapseSize) {
                    $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED);
                }
            }
            $(Selector.BODY).addClass(ClassName.COLLAPSED);
            if (this._options.enableRemember) {
                localStorage.setItem("remember" + EVENT_KEY, ClassName.COLLAPSED);
            }
            var collapsedEvent = $.Event(Event.COLLAPSED);
            $(this._element).trigger(collapsedEvent);
        };
        PushMenu.prototype.toggle = function () {
            if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED)) {
                this.collapse();
            }
            else {
                this.expand();
            }
        };
        PushMenu.prototype.autoCollapse = function (resize) {
            if (resize === void 0) { resize = false; }
            if (this._options.autoCollapseSize) {
                if ($(window).width() <= this._options.autoCollapseSize) {
                    if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {
                        this.collapse();
                    }
                }
                else if (resize == true) {
                    if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
                        $(Selector.BODY).removeClass(ClassName.OPEN);
                    }
                    else if ($(Selector.BODY).hasClass(ClassName.CLOSED)) {
                        this.expand();
                    }
                }
            }
        };
        PushMenu.prototype.remember = function () {
            if (this._options.enableRemember) {
                var toggleState = localStorage.getItem("remember" + EVENT_KEY);
                if (toggleState == ClassName.COLLAPSED) {
                    if (this._options.noTransitionAfterReload) {
                        $("body").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function () {
                            $(this).removeClass('hold-transition');
                            $(this).dequeue();
                        });
                    }
                    else {
                        $("body").addClass(ClassName.COLLAPSED);
                    }
                }
                else {
                    if (this._options.noTransitionAfterReload) {
                        $("body").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function () {
                            $(this).removeClass('hold-transition');
                            $(this).dequeue();
                        });
                    }
                    else {
                        $("body").removeClass(ClassName.COLLAPSED);
                    }
                }
            }
        };
        // Private
        PushMenu.prototype._init = function () {
            var _this = this;
            this.remember();
            this.autoCollapse();
            $(window).resize(function () {
                _this.autoCollapse(true);
            });
        };
        PushMenu.prototype._addOverlay = function () {
            var _this = this;
            var overlay = $('<div />', {
                id: 'sidebar-overlay'
            });
            overlay.on('click', function () {
                _this.collapse();
            });
            $(Selector.WRAPPER).append(overlay);
        };
        // Static
        PushMenu._jQueryInterface = function (operation) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _options = $.extend({}, Default, $(this).data());
                if (!data) {
                    data = new PushMenu(this, _options);
                    $(this).data(DATA_KEY, data);
                }
                if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
                    data[operation]();
                }
            });
        };
        return PushMenu;
    }());
    /**
     * Data API
     * ====================================================
     */
    $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
        event.preventDefault();
        var button = event.currentTarget;
        if ($(button).data('widget') !== 'pushmenu') {
            button = $(button).closest(Selector.TOGGLE_BUTTON);
        }
        PushMenu._jQueryInterface.call($(button), 'toggle');
    });
    $(window).on('load', function () {
        PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON));
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = PushMenu._jQueryInterface;
    $.fn[NAME].Constructor = PushMenu;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return PushMenu._jQueryInterface;
    };
    return PushMenu;
})(jQuery);
exports["default"] = PushMenu;
