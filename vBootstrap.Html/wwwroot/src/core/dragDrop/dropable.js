(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    var dragDropConfig = vBootstrap.config.dragDrop;

    namespace('vBootstrap.core.dragDrop').dropable = {
        init: initDropable
    };

    function initDropable(editor, obj) {
        var elem = obj.elem;
        var jElem = $(elem);

        var dragDropService = editor.dragDropService;
        var unsubDragging = dragDropService.onDragging
            .map(isOverAndNotChildren)
            .toProperty(false)
            .assign(jElem, 'toggleClass', dragDropConfig.cssClasses.dropable);

        var unsubStopDrag = dragDropService.onStopDrag
            .assign(jElem, 'removeClass', dragDropConfig.cssClasses.dropable);

        var elemVBData = vBUtils.getVBData(elem);
        elemVBData.onDispose([unsubDragging, unsubStopDrag]);

        function isOverAndNotChildren(ev) {
            var draggedElem = $(editor.elem).find('.' + dragDropConfig.cssClasses.beingDragged);
            if (draggedElem.length) {
                var isDescendant = draggedElem.find(elem).length > 0;
                if (isDescendant) return false;
            }

            return vBUtils.isCursorOverElem(ev, jElem, dragDropConfig.threshold);
        }
    }
})();