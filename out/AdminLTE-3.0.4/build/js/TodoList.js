"use strict";
/**
 * --------------------------------------------
 * AdminLTE TodoList.js
 * License MIT
 * --------------------------------------------
 */
exports.__esModule = true;
var TodoList = (function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'TodoList';
    var DATA_KEY = 'lte.todolist';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
        DATA_TOGGLE: '[data-widget="todo-list"]'
    };
    var ClassName = {
        TODO_LIST_DONE: 'done'
    };
    var Default = {
        onCheck: function (item) {
            return item;
        },
        onUnCheck: function (item) {
            return item;
        }
    };
    /**
     * Class Definition
     * ====================================================
     */
    var TodoList = /** @class */ (function () {
        function TodoList(element, config) {
            this._config = config;
            this._element = element;
            this._init();
        }
        // Public
        TodoList.prototype.toggle = function (item) {
            item.parents('li').toggleClass(ClassName.TODO_LIST_DONE);
            if (!$(item).prop('checked')) {
                this.unCheck($(item));
                return;
            }
            this.check(item);
        };
        TodoList.prototype.check = function (item) {
            this._config.onCheck.call(item);
        };
        TodoList.prototype.unCheck = function (item) {
            this._config.onUnCheck.call(item);
        };
        // Private
        TodoList.prototype._init = function () {
            var that = this;
            $(Selector.DATA_TOGGLE).find('input:checkbox:checked').parents('li').toggleClass(ClassName.TODO_LIST_DONE);
            $(Selector.DATA_TOGGLE).on('change', 'input:checkbox', function (event) {
                that.toggle($(event.target));
            });
        };
        // Static
        TodoList._jQueryInterface = function (config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY);
                var _options = $.extend({}, Default, $(this).data());
                if (!data) {
                    data = new TodoList($(this), _options);
                    $(this).data(DATA_KEY, data);
                }
                if (config === 'init') {
                    data[config]();
                }
            });
        };
        return TodoList;
    }());
    /**
     * Data API
     * ====================================================
     */
    $(window).on('load', function () {
        TodoList._jQueryInterface.call($(Selector.DATA_TOGGLE));
    });
    /**
     * jQuery API
     * ====================================================
     */
    $.fn[NAME] = TodoList._jQueryInterface;
    $.fn[NAME].Constructor = TodoList;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return TodoList._jQueryInterface;
    };
    return TodoList;
})(jQuery);
exports["default"] = TodoList;
