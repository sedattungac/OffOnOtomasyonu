"use strict";
/**
 * --------------------------------------------
 * AdminLTE CardWidget.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var CardWidget = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardWidget';
    var DATA_KEY = 'lte.cardwidget';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
        EXPANDED: "expanded" + EVENT_KEY,
        COLLAPSED: "collapsed" + EVENT_KEY,
        MAXIMIZED: "maximized" + EVENT_KEY,
        MINIMIZED: "minimized" + EVENT_KEY,
        REMOVED: "removed" + EVENT_KEY
    };
    var ClassName = {
        CARD: 'card',
        COLLAPSED: 'collapsed-card',
        COLLAPSING: 'collapsing-card',
        EXPANDING: 'expanding-card',
        WAS_COLLAPSED: 'was-collapsed',
        MAXIMIZED: 'maximized-card'
    };
    var Selector = {
        DATA_REMOVE: '[data-card-widget="remove"]',
        DATA_COLLAPSE: '[data-card-widget="collapse"]',
        DATA_MAXIMIZE: '[data-card-widget="maximize"]',
        CARD: "." + ClassName.CARD,
        CARD_HEADER: '.card-header',
        CARD_BODY: '.card-body',
        CARD_FOOTER: '.card-footer',
        COLLAPSED: "." + ClassName.COLLAPSED
    };
    var Default = {
        animationSpeed: 'normal',
        collapseTrigger: Selector.DATA_COLLAPSE,
        removeTrigger: Selector.DATA_REMOVE,
        maximizeTrigger: Selector.DATA_MAXIMIZE,
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        maximizeIcon: 'fa-expand',
        minimizeIcon: 'fa-compress'
    };
    var CardWidget = /** @class */ (function () {
        function CardWidget(element, settings) {
            this._element = element;
            this._parent = element.parents(Selector.CARD).first();
            if (element.hasClass(ClassName.CARD)) {
                this._parent = element;
            }
            this._settings = $.extend({}, Default, settings);
        }
        CardWidget.prototype.collapse = function () {
            var _this = this;
            this._parent.addClass(ClassName.COLLAPSING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER)
                .slideUp(this._settings.animationSpeed, function () {
                _this._parent.addClass(ClassName.COLLAPSED).removeClass(ClassName.COLLAPSING);
            });
            this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.collapseIcon)
                .addClass(this._settings.expandIcon)
                .removeClass(this._settings.collapseIcon);
            var collapsed = $.Event(Event.COLLAPSED);
            this._element.trigger(collapsed, this._parent);
        };
        CardWidget.prototype.expand = function () {
            var _this = this;
            this._parent.addClass(ClassName.EXPANDING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER)
                .slideDown(this._settings.animationSpeed, function () {
                _this._parent.removeClass(ClassName.COLLAPSED).removeClass(ClassName.EXPANDING);
            });
            this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.expandIcon)
                .addClass(this._settings.collapseIcon)
                .removeClass(this._settings.expandIcon);
            var expanded = $.Event(Event.EXPANDED);
            this._element.trigger(expanded, this._parent);
        };
        CardWidget.prototype.remove = function () {
            this._parent.slideUp();
            var removed = $.Event(Event.REMOVED);
            this._element.trigger(removed, this._parent);
        };
        CardWidget.prototype.toggle = function () {
            if (this._parent.hasClass(ClassName.COLLAPSED)) {
                this.expand();
                return;
            }
            this.collapse();
        };
        CardWidget.prototype.maximize = function () {
            this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.maximizeIcon)
                .addClass(this._settings.minimizeIcon)
                .removeClass(this._settings.maximizeIcon);
            this._parent.css({
                'height': this._parent.height(),
                'width': this._parent.width(),
                'transition': 'all .15s'
            }).delay(150).queue(function () {
                $(this).addClass(ClassName.MAXIMIZED);
                $('html').addClass(ClassName.MAXIMIZED);
                if ($(this).hasClass(ClassName.COLLAPSED)) {
                    $(this).addClass(ClassName.WAS_COLLAPSED);
                }
                $(this).dequeue();
            });
            var maximized = $.Event(Event.MAXIMIZED);
            this._element.trigger(maximized, this._parent);
        };
        CardWidget.prototype.minimize = function () {
            this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.minimizeIcon)
                .addClass(this._settings.maximizeIcon)
                .removeClass(this._settings.minimizeIcon);
            this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' +
                'width:' + this._parent[0].style.width + ' !important; transition: all .15s;').delay(10).queue(function () {
                $(this).removeClass(ClassName.MAXIMIZED);
                $('html').removeClass(ClassName.MAXIMIZED);
                $(this).css({
                    'height': 'inherit',
                    'width': 'inherit'
                });
                if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {
                    $(this).removeClass(ClassName.WAS_COLLAPSED);
                }
                $(this).dequeue();
            });
            var MINIMIZED = $.Event(Event.MINIMIZED);
            this._element.trigger(MINIMIZED, this._parent);
        };
        CardWidget.prototype.toggleMaximize = function () {
            if (this._parent.hasClass(ClassName.MAXIMIZED)) {
                this.minimize();
                return;
            }
            this.maximize();
        };
        // Private
        CardWidget.prototype._init = function (card) {
            var _this = this;
            this._parent = card;
            $(this).find(this._settings.collapseTrigger).click(function () {
                _this.toggle();
            });
            $(this).find(this._settings.maximizeTrigger).click(function () {
                _this.toggleMaximize();
            });
            $(this).find(this._settings.removeTrigger).click(function () {
                _this.remove();
            });
        };
        // Static
        CardWidget._jQueryInterface = function (config) {
            var data = $(this).data(DATA_KEY);
            var _options = $.extend({}, Default, $(this).data());
            if (!data) {
                data = new CardWidget($(this), _options);
                $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
            }
            if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {
                data[config]();
            }
            else if (typeof config === 'object') {
                data._init($(this));
            }
        };
        return CardWidget;
    }());
    /**
     * Data API
     * ====================================================
     */
    $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
        if (event) {
            event.preventDefault();
        }
        CardWidget._jQueryInterface.call($(this), 'toggle');
    });
    $(document).on('click', Selector.DATA_REMOVE, function (event) {
        if (event) {
            event.preventDefault();
        }
        CardWidget._jQueryInterface.call($(this), 'remove');
    });
    $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {
        if (event) {
            event.preventDefault();
        }
        CardWidget._jQueryInterface.call($(this), 'toggleMaximize');
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = CardWidget._jQueryInterface;
    $.fn[NAME].Constructor = CardWidget;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return CardWidget._jQueryInterface;
    };
    return CardWidget;
})(jQuery);
exports["default"] = CardWidget;
