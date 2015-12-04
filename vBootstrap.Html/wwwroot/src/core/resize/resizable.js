(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var events = vBootstrap.config.events;
    var globalStreams = vBootstrap.config.streams.global;

    function getMousemoveUntilMouseup() {
        return globalStreams.mousemove.takeUntil(globalStreams.mouseup);
    }

    namespace('vBootstrap.core.resize').resizable = {
        init: initResizable
    };

    function initResizable(lockService, config) {
        var elem = config.elem;
        var resizeFn = config.resize;
        var isOverFn = config.isOver;
        var resizableClass = config.resizableClass;
        var resizingClass = config.resizingClass;

        var mouseout = elem.asEventStream(events.mouseout);
        var mousemove = elem.asEventStream(events.mousemove);
        var mousedown = elem.asEventStream(events.mousedown);

        var isOver = mousemove.map(isOverFn).toProperty(false);
        var mousedownOnOver = mousedown.filter(isOver);

        var isResizing = mousedownOnOver.map(true)
          .merge(globalStreams.mouseup.map(false))
          .toProperty(false);

        var elemVBData = vBUtils.getVBData(elem);
        if (elemVBData.isResizing) {
            elemVBData.isResizing = elemVBData.isResizing.or(isResizing);
        } else {
            elemVBData.isResizing = isResizing;
        }
        vBUtils.setVBData(elem, elemVBData);

        lockService.lockOn(isResizing);

        var unsubIsOver = isOver.filter(lockService.isNotLocked).assign(elem, 'toggleClass', resizableClass);
        var unsubMouseout = mouseout.assign(elem, 'removeClass', resizableClass);

        var unsubMousedownOnOverElem = mousedownOnOver.assign(elem, 'addClass', resizingClass);
        var unsubMouseupElem = globalStreams.mouseup.assign(elem, 'removeClass', resizingClass);
        var unsubMousedownOnOverBody = mousedownOnOver.assign($(document.body), 'addClass', resizingClass);
        var unsubMouseupBody = globalStreams.mouseup.assign($(document.body), 'removeClass', resizingClass);

        var unsubResize = mousedownOnOver.flatMap(getMousemoveUntilMouseup).onValue(resizeFn);

        var elemVBData = vBUtils.getVBData(elem);
        elemVBData.onDispose([
            unsubIsOver,
            unsubMouseout,
            unsubMousedownOnOverElem,
            unsubMouseupElem,
            unsubMousedownOnOverBody,
            unsubMouseupBody,
            unsubResize]);
    }

})();