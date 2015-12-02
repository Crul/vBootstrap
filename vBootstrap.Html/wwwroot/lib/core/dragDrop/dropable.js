(function () {
    "use strict";
    var selectors = vBootstrap.config.selectors;
    var dragDropConfig = vBootstrap.config.dragDrop;
    var dragDropService = vBootstrap.core.dragDrop.dragDropService;

    namespace('vBootstrap.core.dragDrop').dropable = {
        init: initDropable
    };

    function initDropable(e) {
        var elem = $(e);

        dragDropService.onDragging
            .map(isOverAndNotChildren)
            .toProperty(false)
            .assign(elem, 'toggleClass', dragDropConfig.cssClasses.dropable);

        dragDropService.onStopDrag
            .assign(elem, 'removeClass', dragDropConfig.cssClasses.dropable);

        function isOverAndNotChildren(ev) {
            var source = ($(ev.currentTarget).data(selectors.vBData) || {}).source;
            if (source) {
                var isDescendant = source.find(e).length > 0;
                if (isDescendant)
                    return false;
            }
            var x = e;
            var offset = elem.offset();

            return (offset.left < ev.clientX + dragDropConfig.threshold)
                && (offset.left + elem.width() > ev.clientX - dragDropConfig.threshold)
                && (offset.top < ev.clientY + dragDropConfig.threshold)
                && (offset.top + elem.height() > ev.clientY - dragDropConfig.threshold);
        }
    }
})();