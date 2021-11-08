"use strict";
/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var Treeview = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Treeview';
    var DATA_KEY = 'lte.treeview';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
        SELECTED: "selected" + EVENT_KEY,
        EXPANDED: "expanded" + EVENT_KEY,
        COLLAPSED: "collapsed" + EVENT_KEY,
        LOAD_DATA_API: "load" + EVENT_KEY
    };
    var Selector = {
        LI: '.nav-item',
        LINK: '.nav-link',
        TREEVIEW_MENU: '.nav-treeview',
        OPEN: '.menu-open',
        DATA_WIDGET: '[data-widget="treeview"]'
    };
    var ClassName = {
        LI: 'nav-item',
        LINK: 'nav-link',
        TREEVIEW_MENU: 'nav-treeview',
        OPEN: 'menu-open',
        SIDEBAR_COLLAPSED: 'sidebar-collapse'
    };
    var Default = {
        trigger: Selector.DATA_WIDGET + " " + Selector.LINK,
        animationSpeed: 300,
        accordion: true,
        expandSidebar: false,
        sidebarButtonSelector: '[data-widget="pushmenu"]'
    };
    /**
     * Class Definition
     * ====================================================
     */
    var Treeview = /** @class */ (function () {
        function Treeview(element, config) {
            this._config = config;
            this._element = element;
        }
        // Public
        Treeview.prototype.init = function () {
            this._setupListeners();
        };
        Treeview.prototype.expand = function (treeviewMenu, parentLi) {
            var _this = this;
            var expandedEvent = $.Event(Event.EXPANDED);
            if (this._config.accordion) {
                var openMenuLi = parentLi.siblings(Selector.OPEN).first();
                var openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
                this.collapse(openTreeview, openMenuLi);
            }
            treeviewMenu.stop().slideDown(this._config.animationSpeed, function () {
                parentLi.addClass(ClassName.OPEN);
                $(_this._element).trigger(expandedEvent);
            });
            if (this._config.expandSidebar) {
                this._expandSidebar();
            }
        };
        Treeview.prototype.collapse = function (treeviewMenu, parentLi) {
            var _this = this;
            var collapsedEvent = $.Event(Event.COLLAPSED);
            treeviewMenu.stop().slideUp(this._config.animationSpeed, function () {
                parentLi.removeClass(ClassName.OPEN);
                $(_this._element).trigger(collapsedEvent);
                treeviewMenu.find(Selector.OPEN + " > " + Selector.TREEVIEW_MENU).slideUp();
                treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
            });
        };
        Treeview.prototype.toggle = function (event) {
            var $relativeTarget = $(event.currentTarget);
            var $parent = $relativeTarget.parent();
            var treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU);
            if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
                if (!$parent.is(Selector.LI)) {
                    treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU);
                }
                if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
                    return;
                }
            }
            event.preventDefault();
            var parentLi = $relativeTarget.parents(Selector.LI).first();
            var isOpen = parentLi.hasClass(ClassName.OPEN);
            if (isOpen) {
                this.collapse($(treeviewMenu), parentLi);
            }
            else {
                this.expand($(treeviewMenu), parentLi);
            }
        };
        // Private
        Treeview.prototype._setupListeners = function () {
            var _this = this;
            $(document).on('click', this._config.trigger, function (event) {
                _this.toggle(event);
            });
        };
        Treeview.prototype._expandSidebar = function () {
            if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {
                $(this._config.sidebarButtonSelector).PushMenu('expand');
            }
        };
        // Static
        Treeview._jQueryInterface = function (config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _options = $.extend({}, Default, $(this).data());
                if (!data) {
                    data = new Treeview($(this), _options);
                    $(this).data(DATA_KEY, data);
                }
                if (config === 'init') {
                    data[config]();
                }
            });
        };
        return Treeview;
    }());
    /**
     * Data API
     * ====================================================
     */
    $(window).on(Event.LOAD_DATA_API, function () {
        $(Selector.DATA_WIDGET).each(function () {
            Treeview._jQueryInterface.call($(this), 'init');
        });
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = Treeview._jQueryInterface;
    $.fn[NAME].Constructor = Treeview;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Treeview._jQueryInterface;
    };
    return Treeview;
})(jQuery);
exports["default"] = Treeview;
