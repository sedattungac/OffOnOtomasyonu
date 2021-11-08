"use strict";
/**
 * --------------------------------------------
 * AdminLTE CardRefresh.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var CardRefresh = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardRefresh';
    var DATA_KEY = 'lte.cardrefresh';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
        LOADED: "loaded" + EVENT_KEY,
        OVERLAY_ADDED: "overlay.added" + EVENT_KEY,
        OVERLAY_REMOVED: "overlay.removed" + EVENT_KEY
    };
    var ClassName = {
        CARD: 'card'
    };
    var Selector = {
        CARD: "." + ClassName.CARD,
        DATA_REFRESH: '[data-card-widget="card-refresh"]'
    };
    var Default = {
        source: '',
        sourceSelector: '',
        params: {},
        trigger: Selector.DATA_REFRESH,
        content: '.card-body',
        loadInContent: true,
        loadOnInit: true,
        responseType: '',
        overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
        onLoadStart: function () {
        },
        onLoadDone: function (response) {
            return response;
        }
    };
    var CardRefresh = /** @class */ (function () {
        function CardRefresh(element, settings) {
            this._element = element;
            this._parent = element.parents(Selector.CARD).first();
            this._settings = $.extend({}, Default, settings);
            this._overlay = $(this._settings.overlayTemplate);
            if (element.hasClass(ClassName.CARD)) {
                this._parent = element;
            }
            if (this._settings.source === '') {
                throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
            }
        }
        CardRefresh.prototype.load = function () {
            this._addOverlay();
            this._settings.onLoadStart.call($(this));
            $.get(this._settings.source, this._settings.params, function (response) {
                if (this._settings.loadInContent) {
                    if (this._settings.sourceSelector != '') {
                        response = $(response).find(this._settings.sourceSelector).html();
                    }
                    this._parent.find(this._settings.content).html(response);
                }
                this._settings.onLoadDone.call($(this), response);
                this._removeOverlay();
            }.bind(this), this._settings.responseType !== '' && this._settings.responseType);
            var loadedEvent = $.Event(Event.LOADED);
            $(this._element).trigger(loadedEvent);
        };
        CardRefresh.prototype._addOverlay = function () {
            this._parent.append(this._overlay);
            var overlayAddedEvent = $.Event(Event.OVERLAY_ADDED);
            $(this._element).trigger(overlayAddedEvent);
        };
        ;
        CardRefresh.prototype._removeOverlay = function () {
            this._parent.find(this._overlay).remove();
            var overlayRemovedEvent = $.Event(Event.OVERLAY_REMOVED);
            $(this._element).trigger(overlayRemovedEvent);
        };
        ;
        // Private
        CardRefresh.prototype._init = function (card) {
            var _this = this;
            $(this).find(this._settings.trigger).on('click', function () {
                _this.load();
            });
            if (this._settings.loadOnInit) {
                this.load();
            }
        };
        // Static
        CardRefresh._jQueryInterface = function (config) {
            var data = $(this).data(DATA_KEY);
            var _options = $.extend({}, Default, $(this).data());
            if (!data) {
                data = new CardRefresh($(this), _options);
                $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
            }
            if (typeof config === 'string' && config.match(/load/)) {
                data[config]();
            }
            else {
                data._init($(this));
            }
        };
        return CardRefresh;
    }());
    /**
     * Data API
     * ====================================================
     */
    $(document).on('click', Selector.DATA_REFRESH, function (event) {
        if (event) {
            event.preventDefault();
        }
        CardRefresh._jQueryInterface.call($(this), 'load');
    });
    $(document).ready(function () {
        $(Selector.DATA_REFRESH).each(function () {
            CardRefresh._jQueryInterface.call($(this));
        });
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = CardRefresh._jQueryInterface;
    $.fn[NAME].Constructor = CardRefresh;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return CardRefresh._jQueryInterface;
    };
    return CardRefresh;
})(jQuery);
exports["default"] = CardRefresh;
