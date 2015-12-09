(function () {
    "use strict";
    var globalStreams = namespace('vBootstrap.config.streams.global');

    function getMousemoveUntilMouseup() {
        return globalStreams.mousemove.takeUntil(globalStreams.mouseup);
    }

    namespace('vBootstrap.core.resize').resizable = {
        init: initResizable
    };

    function initResizable(config) {
        var dependencies = {
            lockService: namespace('vBootstrap.core.lock.Locker')
        };
        config.element.editor.resolve(dependencies, load, { config: config });
    }

    function load(lockService) {
        var config = this.config;
        var element = config.element;
        var jElem = element.jElem;
        var resizeFn = config.resize;
        var isOverFn = config.isOver;
        var resizableClass = config.resizableClass;
        var resizingClass = config.resizingClass;

        var mouseout = element.elemStreams.mouseout;
        var mousemove = element.elemStreams.mousemove;
        var mousedown = element.elemStreams.mousedown;

        var isOverAndNotLocked = mousemove.map(isOverFn)
            .toProperty(false).and(lockService.isNotLocked);
        
        var mousedownOnOver = mousedown.filter(isOverAndNotLocked);

        var isResizing = mousedownOnOver.map(true)
          .merge(globalStreams.mouseup.map(false))
          .toProperty(false);

        lockService.lockOn(isResizing);

        if (element.isResizing) {
            element.isResizing = element.isResizing.or(isResizing);
        } else {
            element.isResizing = isResizing;
        }

        var unsubIsOver = mousemove.map(isOverFn).filter(lockService.isNotLocked).assign(jElem, 'toggleClass', resizableClass);
        var unsubMouseout = mouseout.assign(jElem, 'removeClass', resizableClass);

        var unsubMousedownOnOverElem = mousedownOnOver.assign(jElem, 'addClass', resizingClass);
        var unsubMouseupElem = globalStreams.mouseup.assign(jElem, 'removeClass', resizingClass);
        var unsubMousedownOnOverBody = mousedownOnOver.assign($(document.body), 'addClass', resizingClass);
        var unsubMouseupBody = globalStreams.mouseup.assign($(document.body), 'removeClass', resizingClass);
        var unsubResize = mousedownOnOver.flatMap(getMousemoveUntilMouseup).onValue(resizeFn);

        element.onDispose([
            unsubIsOver,
            unsubMouseout,
            unsubMousedownOnOverElem,
            unsubMouseupElem,
            unsubMousedownOnOverBody,
            unsubMouseupBody,
            unsubResize]);
    }

})();