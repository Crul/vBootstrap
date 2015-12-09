(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    namespace('vBootstrap.core.dragDrop').selfDraggable = {
        init: initSelfDraggable
    };

    function initSelfDraggable(element) {

        function getShadowTemplate() {
            return element.jElem;
        }

        function getOffset(ev) {
            return { x: ev.offsetX, y: ev.offsetY };
        }

        var draggableConfig = {
            element: element,
            getShadowTemplate: getShadowTemplate,
            getOffset: getOffset
        };

        vBootstrap.core.dragDrop.draggable.init(draggableConfig);

    }
})();