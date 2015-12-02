(function () {
    "use strict";

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

        vBootstrap.core.dragDrop.draggable.init(draggableConfig);

        function getShadowTemplate() {
            return elem;
        }

        function getOffset(ev) {
            return { x: ev.offsetX, y: ev.offsetY };
        }
    }
})();