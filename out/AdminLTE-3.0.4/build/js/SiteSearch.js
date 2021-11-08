"use strict";
/**
 * --------------------------------------------
 * AdminLTE SiteSearch.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var SiteSearch = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'SiteSearch';
    var DATA_KEY = 'lte.site-search';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {};
    var Selector = {
        TOGGLE_BUTTON: '[data-widget="site-search"]',
        SEARCH_BLOCK: '.site-search-block',
        SEARCH_BACKDROP: '.site-search-backdrop',
        SEARCH_INPUT: '.site-search-block .form-control'
    };
    var ClassName = {
        OPEN: 'site-search-open'
    };
    var Default = {
        transitionSpeed: 300
    };
    /**
     * Class Definition
     * ====================================================
     */
    var SiteSearch = /** @class */ (function () {
        function SiteSearch(_element, _options) {
            this.element = _element;
            this.options = $.extend({}, Default, _options);
        }
        // Public
        SiteSearch.prototype.open = function () {
            $(Selector.SEARCH_BLOCK).slideDown(this.options.transitionSpeed);
            $(Selector.SEARCH_BACKDROP).show(0);
            $(Selector.SEARCH_INPUT).focus();
            $(Selector.SEARCH_BLOCK).addClass(ClassName.OPEN);
        };
        SiteSearch.prototype.close = function () {
            $(Selector.SEARCH_BLOCK).slideUp(this.options.transitionSpeed);
            $(Selector.SEARCH_BACKDROP).hide(0);
            $(Selector.SEARCH_BLOCK).removeClass(ClassName.OPEN);
        };
        SiteSearch.prototype.toggle = function () {
            if ($(Selector.SEARCH_BLOCK).hasClass(ClassName.OPEN)) {
                this.close();
            }
            else {
                this.open();
            }
        };
        // Static
        SiteSearch._jQueryInterface = function (options) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY);
                if (!data) {
                    data = new SiteSearch(this, options);
                    $(this).data(DATA_KEY, data);
                }
                if (!/toggle|close/.test(options)) {
                    throw Error("Undefined method " + options);
                }
                data[options]();
            });
        };
        return SiteSearch;
    }());
    /**
     * Data API
     * ====================================================
     */
    $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
        event.preventDefault();
        var button = $(event.currentTarget);
        if (button.data('widget') !== 'site-search') {
            button = button.closest(Selector.TOGGLE_BUTTON);
        }
        SiteSearch._jQueryInterface.call(button, 'toggle');
    });
    $(document).on('click', Selector.SEARCH_BACKDROP, function (event) {
        var backdrop = $(event.currentTarget);
        SiteSearch._jQueryInterface.call(backdrop, 'close');
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = SiteSearch._jQueryInterface;
    $.fn[NAME].Constructor = SiteSearch;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return SiteSearch._jQueryInterface;
    };
    return SiteSearch;
})(jQuery);
exports["default"] = SiteSearch;
