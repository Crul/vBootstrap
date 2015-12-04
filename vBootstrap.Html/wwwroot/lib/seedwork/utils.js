(function (global) {
    "use strict";
    namespace('vBootstrap').utils = {
        removeCssClass: removeCssClass,
        resetCssClass: resetCssClass,
        getChildest: getChildest,
        isCursorOverElem: isCursorOverElem,
        getVBData: getVBData,
        setVBData: setVBData
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

    function isCursorOverElem(ev, jElem, threshold) {
        var offset = jElem.offset();
        var elemProperties = {
            left: offset.left,
            top: offset.top,
            width: jElem.outerWidth(),
            height: jElem.outerHeight()
        };
        threshold = threshold || 0;
        return (elemProperties.left < ev.pageX - threshold)
            && (elemProperties.left + elemProperties.width > ev.pageX + threshold)
            && (elemProperties.top < ev.pageY - threshold)
            && (elemProperties.top + elemProperties.height > ev.pageY + threshold);
    }

    function getVBData(elem) {
        var vBDataSelector = vBootstrap.config.selectors.vBData;
        var jElem = $(elem);
        var elemVBData = jElem.data(vBDataSelector) || {};
        jElem.data(vBDataSelector, elemVBData);
        return elemVBData;
    }

    function setVBData(elem, data) {
        var vBDataSelector = vBootstrap.config.selectors.vBData;
        data = data || {};
        var elemVBData = $.extend({}, getVBData(elem), data);
        $(elem).data(vBDataSelector, elemVBData);
    }

})(window);