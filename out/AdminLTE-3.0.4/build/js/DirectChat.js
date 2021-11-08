"use strict";
/**
 * --------------------------------------------
 * AdminLTE DirectChat.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var DirectChat = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'DirectChat';
    var DATA_KEY = 'lte.directchat';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var DATA_API_KEY = '.data-api';
    var Event = {
        TOGGLED: "toggled{EVENT_KEY}"
    };
    var Selector = {
        DATA_TOGGLE: '[data-widget="chat-pane-toggle"]',
        DIRECT_CHAT: '.direct-chat'
    };
    var ClassName = {
        DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'
    };
    /**
     * Class Definition
     * ====================================================
     */
    var DirectChat = /** @class */ (function () {
        function DirectChat(element, config) {
            this._element = element;
        }
        DirectChat.prototype.toggle = function () {
            $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN);
            var toggledEvent = $.Event(Event.TOGGLED);
            $(this._element).trigger(toggledEvent);
        };
        // Static
        DirectChat._jQueryInterface = function (config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY);
                if (!data) {
                    data = new DirectChat($(this));
                    $(this).data(DATA_KEY, data);
                }
                data[config]();
            });
        };
        return DirectChat;
    }());
    /**
     *
     * Data Api implementation
     * ====================================================
     */
    $(document).on('click', Selector.DATA_TOGGLE, function (event) {
        if (event)
            event.preventDefault();
        DirectChat._jQueryInterface.call($(this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = DirectChat._jQueryInterface;
    $.fn[NAME].Constructor = DirectChat;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return DirectChat._jQueryInterface;
    };
    return DirectChat;
})(jQuery);
exports["default"] = DirectChat;
