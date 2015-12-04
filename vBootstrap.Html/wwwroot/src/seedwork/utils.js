﻿(function (global) {
    "use strict";
    namespace('vBootstrap').utils = {
        removeCssClass: removeCssClass,
        resetCssClass: resetCssClass,
        getChildest: getChildest,
        isCursorOverElem: isCursorOverElem,
        getSortByDistanceFn: getSortByDistanceFn,
        getIsEvBeforeElem: getIsEvBeforeElem,
        getVBData: getVBData,
        setVBData: setVBData
    };

    function resetCssClass(cssClass) {
        $('.' + cssClass).removeClass(cssClass);
    }

    function removeCssClass(cssClass) {
        $('.' + cssClass).remove();
    }

    function getChildest(obj, cssClass) {
        var candidates = $(obj).find('.' + cssClass);
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


    function getSortByDistanceFn(ev) {
        return function byDistance(child1, child2) {
            var jChild1 = $(child1);
            var c1Offset = jChild1.offset();
            var isEvInC1HRange = isBetweenRange(ev.pageX, c1Offset.left, jChild1.outerWidth());
            var isEvInC1VRange = isBetweenRange(ev.pageY, c1Offset.top, jChild1.outerHeight());
            if (isEvInC1HRange && isEvInC1VRange)
                return -1;

            var jChild2 = $(child2);
            var c2Offset = jChild2.offset();
            var isEvInC2HRange = isBetweenRange(ev.pageX, c2Offset.left, jChild2.outerWidth());
            var isEvInC2VRange = isBetweenRange(ev.pageY, c2Offset.top, jChild2.outerHeight());
            if (isEvInC2HRange && isEvInC2VRange)
                return 1;

            var c1pos = jChild1.offset();
            var c2pos = jChild2.offset();

            var c1dist = 0;
            if (isEvInC1HRange) {
                c1dist = Math.min(Math.abs(c1pos.top - ev.pageY),
                    Math.abs(c1pos.top + jChild1.outerHeight() - ev.pageY));
            } else if (isEvInC1VRange) {
                c1dist = Math.min(Math.abs(c1pos.left - ev.pageX),
                    Math.abs(c1pos.left + jChild1.outerWidth() - ev.pageX));
            } else {
                var c1distX = Math.min(c1pos.top - ev.pageY,
                    c1pos.top + jChild1.outerHeight() - ev.pageY);
                var c1distY = Math.min(c1pos.left - ev.pageX,
                    c1pos.left + jChild1.outerWidth() - ev.pageX);

                c1dist = c1distX + c1distY;
            }

            var c2dist = 0;
            if (isEvInC2HRange) {
                c2dist = Math.min(Math.abs(c2pos.top - ev.pageY),
                    Math.abs(c2pos.top + jChild2.outerHeight() - ev.pageY));
            } else if (isEvInC2VRange) {
                c2dist = Math.min(Math.abs(c2pos.left - ev.pageX),
                    Math.abs(c2pos.left + jChild2.outerWidth() - ev.pageX));
            } else {
                var c2distX = Math.min(c2pos.top - ev.pageY,
                    c2pos.top + jChild2.outerHeight() - ev.pageY);
                var c2distY = Math.min(c2pos.left - ev.pageX,
                    c2pos.left + jChild2.outerWidth() - ev.pageX);

                c2dist = c2distX + c2distY;
            }

            return c1dist - c2dist;
        }
    }

    function isBetweenRange(value, min, range) {
        return (value >= min) && (value <= (min + range));
    }

    function getIsEvBeforeElem(ev, target) {
        var jTarget = $(target);
        var targetPos = jTarget.offset();
        var targetSize = { width: jTarget.outerWidth(), height: jTarget.outerHeight() };
        var targetBottom = (targetPos.top + targetSize.height);
        var slope = (targetSize.height / targetSize.width);
        var relX = (ev.pageX - targetPos.left);
        var limitY = (targetBottom - relX * slope);

        var isBeforeTarget = ev.pageY < limitY;
        return isBeforeTarget;
    }

})(window);