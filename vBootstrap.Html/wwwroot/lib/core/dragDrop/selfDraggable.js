(function () {
    "use strict";
    
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;
    namespace('vBootstrap.core.dragDrop').selfDraggable = {
        init: initSelfDraggable
    };

    function initSelfDraggable(e) {
        var elem = $(e);

        var draggableConfig = {
            element: elem,
            getShadowTemplate: getShadowTemplate,
            getOffset: getOffset
        };

        var draggable = vBootstrap.core.dragDrop.draggable.init(draggableConfig);

        draggable.isDragging.assign(elem, 'toggleClass', dragDropCss.beingDragged);

        function getShadowTemplate() {
            return elem;
        }

        function getOffset(ev) {
            return { x: ev.offsetX, y: ev.offsetY };
        }
    }
})();