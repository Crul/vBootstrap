(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var events = vBootstrap.config.events;
    var dragDropConfig = vBootstrap.config.dragDrop;
    var globalStreams = vBootstrap.config.streams.global;
    var lockService = vBootstrap.core.lock.lockService;

    namespace('vBootstrap.core.dragDrop').draggable = {
        init: initDraggable
    };

    function initDraggable(config) {
        var elem = config.element;
        var getShadowTemplate = config.getShadowTemplate;
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

            var shadowTemplate = getShadowTemplate();
            var shadow = vBootstrap.core.dragDrop.dragShadow(shadowTemplate, ev, offset);
        }

    }
})();