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

        dragDropService.onDragging
            .map(isOverAndNotChildren)
            .toProperty(false)
            .assign(jElem, 'toggleClass', dragDropConfig.cssClasses.dropable);

        dragDropService.onStopDrag
            .assign(jElem, 'removeClass', dragDropConfig.cssClasses.dropable);

        function isOverAndNotChildren(ev) {
            var target = $(ev.currentTarget);
            var source = (target.data(selectors.vBData) || {}).source;
            if (source) {
                var isDescendant = source.find(elem).length > 0;
                if (isDescendant)
                    return false;
            }

            var offset = jElem.offset();
            var elemProperties = {
                left: offset.left,
                top: offset.top,
                width: jElem.width() + 2 * dragDropConfig.padding,
                height: jElem.height() + 2 * dragDropConfig.padding
            };
            return vBUtils.isCursorOverElem(ev, elemProperties, dragDropConfig.threshold);
        }
    }
})();