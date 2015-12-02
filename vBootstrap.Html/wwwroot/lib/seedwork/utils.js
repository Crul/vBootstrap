﻿(function (global) {
    "use strict";
    namespace('vBootstrap').utils = {
        removeCssClass: removeCssClass,
        resetCssClass: resetCssClass,
        getChildest: getChildest,
        isCursorOverElem: isCursorOverElem
    };

    function resetCssClass(cssClass) {
        $('.' + cssClass).removeClass(cssClass);
    }

    function removeCssClass(cssClass) {
        $('.' + cssClass).remove();
    }

    function getChildest(cssClass) {
        var candidates = $('.' + cssClass);
        if (candidates.length === 0)
            return;

        var ascendants = candidates.parents();
        for (var i = 0; i < candidates.length; i++) {
            var candidate = candidates[i];
            if (ascendants.index(candidate) < 0)
                return candidate;
        }
        throw 'utils.getChildest: error';
    }

    function isCursorOverElem(ev, elem, threshold) {
        threshold = threshold || 0;
        return (elem.left < ev.clientX - threshold)
            && (elem.left + elem.width > ev.clientX + threshold)
            && (elem.top < ev.clientY - threshold)
            && (elem.top + elem.height > ev.clientY + threshold);
    }

})(window);