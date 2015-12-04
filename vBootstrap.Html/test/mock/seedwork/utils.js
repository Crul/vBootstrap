(function (global) {
    "use strict";
    namespace('vBootstrap').utils = {
        isCursorOverElem: isCursorOverElem,
        getVBData: getVBData,
        getChildest: getChildest,
        resetCssClass: resetCssClass,
        removeCssClass: removeCssClass,
        mock: {
            setIsCursorOverElem: setIsCursorOverElem,
            setChildestElement: setChildestElement
        }
    };

    function isCursorOverElem(ev, jElem) { }

    function resetCssClass(cssClass) { }

    function removeCssClass(cssClass) { }

    function getVBData() {
        return { onDispose: function () { } }
    }

    function getChildest() {
        return {};
    }

    function setIsCursorOverElem(isOver) {
        vBootstrap.utils.isCursorOverElem = function () {
            return isOver;
        };
    }

    function setChildestElement(childest) {
        vBootstrap.utils.getChildest = function () {
            return childest;
        };
    }
})(window);