"use strict";
/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var Layout = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Layout';
    var DATA_KEY = 'lte.layout';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
        SIDEBAR: 'sidebar'
    };
    var Selector = {
        HEADER: '.main-header',
        MAIN_SIDEBAR: '.main-sidebar',
        SIDEBAR: '.main-sidebar .sidebar',
        CONTENT: '.content-wrapper',
        BRAND: '.brand-link',
        CONTENT_HEADER: '.content-header',
        WRAPPER: '.wrapper',
        CONTROL_SIDEBAR: '.control-sidebar',
        CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
        CONTROL_SIDEBAR_BTN: '[data-widget="control-sidebar"]',
        LAYOUT_FIXED: '.layout-fixed',
        FOOTER: '.main-footer',
        PUSHMENU_BTN: '[data-widget="pushmenu"]',
        LOGIN_BOX: '.login-box',
        REGISTER_BOX: '.register-box'
    };
    var ClassName = {
        HOLD: 'hold-transition',
        SIDEBAR: 'main-sidebar',
        CONTENT_FIXED: 'content-fixed',
        SIDEBAR_FOCUSED: 'sidebar-focused',
        LAYOUT_FIXED: 'layout-fixed',
        NAVBAR_FIXED: 'layout-navbar-fixed',
        FOOTER_FIXED: 'layout-footer-fixed',
        LOGIN_PAGE: 'login-page',
        REGISTER_PAGE: 'register-page',
        CONTROL_SIDEBAR_SLIDE_OPEN: 'control-sidebar-slide-open',
        CONTROL_SIDEBAR_OPEN: 'control-sidebar-open'
    };
    var Default = {
        scrollbarTheme: 'os-theme-light',
        scrollbarAutoHide: 'l',
        panelAutoHeight: true,
        loginRegisterAutoHeight: true
    };
    /**
     * Class Definition
     * ====================================================
     */
    var Layout = /** @class */ (function () {
        function Layout(element, config) {
            this._config = config;
            this._element = element;
            this._init();
        }
        // Public
        Layout.prototype.fixLayoutHeight = function (extra) {
            if (extra === void 0) { extra = null; }
            var control_sidebar = 0;
            if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || extra == 'control_sidebar') {
                control_sidebar = $(Selector.CONTROL_SIDEBAR_CONTENT).height();
            }
            var heights = {
                window: $(window).height(),
                header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,
                footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,
                sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,
                control_sidebar: control_sidebar
            };
            var max = this._max(heights);
            var offset = this._config.panelAutoHeight;
            if (offset === true) {
                offset = 0;
            }
            if (offset !== false) {
                if (max == heights.control_sidebar) {
                    $(Selector.CONTENT).css('min-height', (max + offset));
                }
                else if (max == heights.window) {
                    $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer);
                }
                else {
                    $(Selector.CONTENT).css('min-height', (max + offset) - heights.header);
                }
            }
            if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
                if (offset !== false) {
                    $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer);
                }
                if (typeof $.fn.overlayScrollbars !== 'undefined') {
                    $(Selector.SIDEBAR).overlayScrollbars({
                        className: this._config.scrollbarTheme,
                        sizeAutoCapable: true,
                        scrollbars: {
                            autoHide: this._config.scrollbarAutoHide,
                            clickScrolling: true
                        }
                    });
                }
            }
        };
        Layout.prototype.fixLoginRegisterHeight = function () {
            if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {
                $('body, html').css('height', 'auto');
            }
            else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {
                var box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height();
                if ($('body').css('min-height') !== box_height) {
                    $('body').css('min-height', box_height);
                }
            }
        };
        // Private
        Layout.prototype._init = function () {
            var _this = this;
            // Activate layout height watcher
            this.fixLayoutHeight();
            if (this._config.loginRegisterAutoHeight === true) {
                this.fixLoginRegisterHeight();
            }
            else if (Number.isInteger(this._config.loginRegisterAutoHeight)) {
                setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
            }
            $(Selector.SIDEBAR)
                .on('collapsed.lte.treeview expanded.lte.treeview', function () {
                _this.fixLayoutHeight();
            });
            $(Selector.PUSHMENU_BTN)
                .on('collapsed.lte.pushmenu shown.lte.pushmenu', function () {
                _this.fixLayoutHeight();
            });
            $(Selector.CONTROL_SIDEBAR_BTN)
                .on('collapsed.lte.controlsidebar', function () {
                _this.fixLayoutHeight();
            })
                .on('expanded.lte.controlsidebar', function () {
                _this.fixLayoutHeight('control_sidebar');
            });
            $(window).resize(function () {
                _this.fixLayoutHeight();
            });
            $('body.hold-transition').removeClass('hold-transition');
        };
        Layout.prototype._max = function (numbers) {
            // Calculate the maximum number in a list
            var max = 0;
            Object.keys(numbers).forEach(function (key) {
                if (numbers[key] > max) {
                    max = numbers[key];
                }
            });
            return max;
        };
        // Static
        Layout._jQueryInterface = function (config) {
            if (config === void 0) { config = ''; }
            return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _options = $.extend({}, Default, $(this).data());
                if (!data) {
                    data = new Layout($(this), _options);
                    $(this).data(DATA_KEY, data);
                }
                if (config === 'init' || config === '') {
                    data['_init']();
                }
                else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
                    data[config]();
                }
            });
        };
        return Layout;
    }());
    /**
     * Data API
     * ====================================================
     */
    $(window).on('load', function () {
        Layout._jQueryInterface.call($('body'));
    });
    $(Selector.SIDEBAR + ' a').on('focusin', function () {
        $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);
    });
    $(Selector.SIDEBAR + ' a').on('focusout', function () {
        $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = Layout._jQueryInterface;
    $.fn[NAME].Constructor = Layout;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Layout._jQueryInterface;
    };
    return Layout;
})(jQuery);
exports["default"] = Layout;
