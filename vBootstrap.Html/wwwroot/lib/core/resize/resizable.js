(function () {
    "use strict";
    var events = vBootstrap.config.events;
    var globalStreams = vBootstrap.config.streams.global;
    var lockService = vBootstrap.core.lock.lockService;

    function getMousemoveUntilMouseup() {
        return globalStreams.mousemove.takeUntil(globalStreams.mouseup);
    }

    namespace('vBootstrap.core.resize').resizable = {
        init: initResizable
    };

    function initResizable(config) {
        var elem = $(config.elem);
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

        lockService.lockOn(isResizing);

        isOver.filter(lockService.isNotLocked).assign(elem, 'toggleClass', resizableClass);
        mouseout.assign(elem, 'removeClass', resizableClass);

        mousedownOnOver.assign(elem, 'addClass', resizingClass);
        globalStreams.mouseup.assign(elem, 'removeClass', resizingClass);
        mousedownOnOver.assign($(document.body), 'addClass', resizingClass);
        globalStreams.mouseup.assign($(document.body), 'removeClass', resizingClass);

        mousedownOnOver.flatMap(getMousemoveUntilMouseup).onValue(resizeFn);
    }

})();