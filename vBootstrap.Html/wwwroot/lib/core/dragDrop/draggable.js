(function () {
    "use strict";
    var events = vBootstrap.config.events;
    var lockService = vBootstrap.core.lock.lockService;

    namespace('vBootstrap.core.dragDrop').draggable = {
        init: initDraggable
    };

    function initDraggable(config) {
        var elem = config.element;
        var getShadowTemplate = config.getShadowTemplate;
        var globalMouseup = $(document).asEventStream(events.mouseup);
        var mousedown = elem.asEventStream(events.mousedown);
        mousedown.filter(lockService.isNotLocked).onValue(onValueFn);

        var isDragging = mousedown.map(true)
          .merge(globalMouseup.map(false))
          .toProperty(false);

        lockService.lockOn(isDragging);

        function onValueFn(ev) {
            var offset;
            if (config.getOffset)
                offset = config.getOffset(ev);

            var shadowTemplate = getShadowTemplate();
            var shadow = vBootstrap.core.dragDrop.dragShadow(shadowTemplate, ev, offset);
        }

    }
})();