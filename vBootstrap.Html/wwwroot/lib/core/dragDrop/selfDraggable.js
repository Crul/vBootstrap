(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    namespace('vBootstrap.core.dragDrop').selfDraggable = {
        init: initSelfDraggable
    };

    function initSelfDraggable(obj) {
        var jElem = $(obj.elem);

        var draggableConfig = {
            element: jElem,
            getShadowTemplate: getShadowTemplate,
            getOffset: getOffset
        };

        var draggable = vBootstrap.core.dragDrop.draggable.init(draggableConfig);

        var unsubFn = draggable.isDragging.assign(jElem, 'toggleClass', dragDropCss.beingDragged);
        vBUtils.getVBData(jElem).onDispose(unsubFn);

        function getShadowTemplate() {
            return jElem;
        }

        function getOffset(ev) {
            return { x: ev.offsetX, y: ev.offsetY };
        }
    }
})();