(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    var dragDropConfig = vBootstrap.config.dragDrop;
    var dragDropService = vBootstrap.core.dragDrop.dragDropService;

    namespace('vBootstrap.core.dragDrop').dropable = {
        init: initDropable
    };

    function initDropable(elem) {
        var jElem = $(elem);

        var unsubDragging = dragDropService.onDragging
            .map(isOverAndNotChildren)
            .toProperty(false)
            .assign(jElem, 'toggleClass', dragDropConfig.cssClasses.dropable);

        var unsubStopDrag = dragDropService.onStopDrag
            .assign(jElem, 'removeClass', dragDropConfig.cssClasses.dropable);

        var elemVBData = vBUtils.getVBData(elem);
        elemVBData.onDispose([unsubDragging, unsubStopDrag]);

        function isOverAndNotChildren(ev) {
            var draggedElem = $('.' + dragDropConfig.cssClasses.beingDragged);
            if (draggedElem) {
                var isDescendant = draggedElem.find(elem).length > 0;
                if (isDescendant)
                    return false;
            }

            var offset = jElem.offset();
            var elemProperties = {
                left: offset.left,
                top: offset.top,
                width: jElem.outerWidth(),
                height: jElem.outerHeight()
            };
            return vBUtils.isCursorOverElem(ev, elemProperties, dragDropConfig.threshold);
        }
    }
})();