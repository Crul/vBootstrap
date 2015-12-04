(function (global) {
    "use strict";
    var fixedVBData;

    namespace('vBootstrap').utils = {
        isCursorOverElem: isCursorOverElem,
        getVBData: getVBData,
        getChildest: getChildest,
        resetCssClass: resetCssClass,
        removeCssClass: removeCssClass,
        mock: {
            setIsCursorOverElem: setIsCursorOverElem,
            setChildestElement: setChildestElement,
            setVBData: setVBData
        }
    };

    function isCursorOverElem(ev, jElem) { }

    function resetCssClass(cssClass) { }

    function removeCssClass(cssClass) { }

    function getVBData() {
        return fixedVBData || { onDispose: function () { } }
    }

    function getChildest() {
        return {};
    }

    function setVBData(vBData) {
        fixedVBData = vBData;
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