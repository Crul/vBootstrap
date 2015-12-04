(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var events = vBootstrap.config.events;
    var dragDropConfig = vBootstrap.config.dragDrop;
    var globalStreams = vBootstrap.config.streams.global;

    namespace('vBootstrap.core.dragDrop').draggable = {
        init: initDraggable
    };

    function initDraggable(dragDropService, lockService, config) {
        var elem = config.element;
        var mousedonwNotLocked = elem.asEventStream(events.mousedown).filter(lockService.isNotLocked);

        var unsubFn = mousedonwNotLocked.onValue(onValueFn);

        var isDragging = mousedonwNotLocked.map(true)
          .merge(globalStreams.mouseup.map(false))
          .toProperty(false);

        lockService.lockOn(isDragging);

        var elemVBData = vBUtils.getVBData(elem);
        if (elemVBData.onDispose)
            elemVBData.onDispose([unsubFn, removeLockOn]);

        return {
            isDragging: isDragging
        };

        function removeLockOn() {
            lockService.removeLockOn(isDragging);
        }

        function onValueFn(ev) {
            var offset;
            if (config.getOffset)
                offset = config.getOffset(ev);

            var shadowTemplate = config.getShadowTemplate();
            var shadow = vBootstrap.core.dragDrop.dragShadow(dragDropService, shadowTemplate, ev, offset);
        }

    }
})();