(function () {
    "use strict";
    var events = vBootstrap.config.events;
    var selectors = vBootstrap.config.selectors;
    var dragDropConfig = vBootstrap.config.dragDrop;
    var dragDropService = vBootstrap.core.dragDrop.dragDropService;

    var globalMousemove = $(document).asEventStream(events.mousemove);
    var globalMouseup = $(document).asEventStream(events.mouseup);

    namespace('vBootstrap.core.dragDrop').dragShadow = vBDragShadow;

    function vBDragShadow(elem, ev, offset) {
        var shadow = createShadowElem(elem);
        offset = offset || getOffsetFn(shadow);

        var shadowMousemove = shadow.asEventStream(events.mousemove);
        dragDropService.startDrag(shadowMousemove, ev);
        moveElement(ev);
        var unsubMousemove = globalMousemove.onValue(moveElement);
        var unsubRemoveShadow = globalMouseup.onValue(removeShadow);

        return shadow;

        function moveElement(ev) {
            var css = {
                top: ev.clientY - offset.y,
                left: ev.clientX - offset.x
            };
            shadow.css(css);
        }

        function removeShadow() {
            elem.data(selectors.vBData).isDragging = false;
            shadow.remove();
            unsubMousemove();
            unsubRemoveShadow();
        }
    }

    function getOffsetFn(_shadow) {
        return {
            x: $(_shadow)[0].offsetWidth / 2,
            y: $(_shadow)[0].offsetHeight / 2
        };
    }

    function createShadowElem(elem) {
        var shadow = elem.clone();

        if (elem[0].offsetWidth)
            shadow.width(elem[0].offsetWidth);

        if (elem[0].offsetHeight)
            shadow.height(elem[0].offsetHeight);

        shadow.css('position', 'absolute');
        shadow.addClass(dragDropConfig.cssClasses.dragging);

        var shadowVBData = shadow.data(selectors.vBData) || {};
        shadowVBData.source = elem;
        shadow.data(selectors.vBData, shadowVBData);

        var elemVBData = elem.data(selectors.vBData) || {};
        elemVBData.isDragging = true;
        elem.data(selectors.vBData, elemVBData);

        $(selectors.editor).append(shadow);

        return shadow;
    }

})();