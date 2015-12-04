(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var dragDropConfig = vBootstrap.config.dragDrop;
    var dragDropService = vBootstrap.core.dragDrop.dragDropService;

    namespace('vBootstrap.core.dragDrop').dragShadow = vBDragShadow;

    function vBDragShadow(elem, ev, offset) {
        var shadow = createShadowElem(elem);
        offset = offset || getOffsetFn(shadow);

        dragDropService.startDrag(ev);
        moveElement(ev);
        var unsubMousemove = globalStreams.mousemove.onValue(moveElement);
        var unsubRemoveShadow = globalStreams.mouseup.onValue(removeShadow);

        return shadow;

        function moveElement(ev) {
            var css = {
                top: ev.pageY - offset.y,
                left: ev.pageX - offset.x
            };
            shadow.css(css);
        }

        function removeShadow() {
            vBUtils.setVBData(elem, { isDragging: false });
            unsubMousemove();
            unsubRemoveShadow();
        }
    }

    function getOffsetFn(_shadow) {
        return {
            x: $(_shadow).outerWidth() / 2,
            y: $(_shadow).outerHeight() / 2
        };
    }

    function createShadowElem(elem) {
        var jElem = $(elem);
        var shadow = jElem.clone();

        if (jElem.outerWidth()) {
            shadow.width(jElem.outerWidth());
            shadow.height(jElem.outerHeight());
        }

        shadow.css('position', 'absolute');
        shadow.addClass(dragDropConfig.cssClasses.dragging);

        vBUtils.setVBData(shadow, { source: jElem });
        vBUtils.setVBData(elem, { isDragging: true });

        $(vBootstrap.config.selectors.editor).append(shadow);

        return shadow;
    }

})();