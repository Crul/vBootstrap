(function () {
    "use strict";
    var events = vBootstrap.config.events;
    var selectors = vBootstrap.config.selectors;
    var lockService = vBootstrap.core.lock.lockService;
    var dragDropService = vBootstrap.core.dragDrop.dragDropService;

    namespace('vBootstrap.core.dragDrop').dragable = {
        init: initDragable
    };

    function initDragable(e) {
        var elem = $(e);
        var mousedown = elem.asEventStream(events.mousedown);
        var globalMouseup = $(document).asEventStream(events.mouseup);
        mousedown.filter(lockService.isNotLocked).onValue(createShadow);

        var isDragging = mousedown.map(true)
          .merge(globalMouseup.map(false))
          .toProperty(false);

        lockService.lockOn(isDragging);

        function createShadow(ev) {
            var shadow = vBootstrap.core.dragDrop.dragShadow(elem);
            var offset = { x: ev.offsetX, y: ev.offsetY };
            var mousemoveShadow = shadow.asEventStream(events.mousemove);
            mousemoveShadow.onValue(moveElement);
            dragDropService.startDrag(mousemoveShadow, ev);

            var unsubRemoveShadow = globalMouseup.subscribe(removeShadow);
            function removeShadow() {
                elem.data(selectors.vBData).isDragging = false;
                shadow.remove();
                unsubRemoveShadow();
            }

            function moveElement(ev) {
                var css = {
                    top: ev.clientY - offset.y,
                    left: ev.clientX - offset.x
                };
                shadow.css(css);
            }
        }
    }
})();