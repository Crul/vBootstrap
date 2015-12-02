(function () {
    "use strict";
    var events = vBootstrap.config.events;
    var globalStreams = vBootstrap.config.streams.global;
    var lockService = vBootstrap.core.lock.lockService;

    namespace('vBootstrap.core.dragDrop').draggable = {
        init: initDraggable
    };

    function initDraggable(config) {
        var elem = config.element;
        var getShadowTemplate = config.getShadowTemplate;
        var mousedown = elem.asEventStream(events.mousedown);
        var mousedonwNotLocked = mousedown.filter(lockService.isNotLocked);
        mousedonwNotLocked.onValue(onValueFn);

        var isDragging = mousedonwNotLocked.map(true)
          .merge(globalStreams.mouseup.map(false))
          .toProperty(false);

        lockService.lockOn(isDragging);

        return {
            isDragging: isDragging
        };

        function onValueFn(ev) {
            var offset;
            if (config.getOffset)
                offset = config.getOffset(ev);

            var shadowTemplate = getShadowTemplate();
            var shadow = vBootstrap.core.dragDrop.dragShadow(shadowTemplate, ev, offset);
        }

    }
})();