(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    namespace('vBootstrap.core.dragDrop').dropTargetSelector = vBDropTargetSelector;

    function vBDropTargetSelector(editor) {
        var draggingBus = new Bacon.Bus();

        var childestDropable = globalStreams.mousemove
            .filter(editor.dragDropService.isDragging)
            .map(getChildestDropable)
            .toProperty();

        var dropableTarget = childestDropable
            .sampledBy(globalStreams.mousemove, mapDropableAndEvent)
            .map(getDropableTarget)
            .toProperty();

        var unsubBindingTarget;
        function startBindingTarget() {
            unsubBindingTarget = dropableTarget
                .sampledBy(globalStreams.mousemove, mapDropableAndEvent)
                .onValue(setDropableTarget);
        }

        function stopBindingTarget() {
            if (unsubBindingTarget)
                unsubBindingTarget();
        }

        return {
            startBindingTarget: startBindingTarget,
            stopBindingTarget: stopBindingTarget,
            target: dropableTarget
        };

        function getDropableTarget(val) {
            if (!val.dropable) return;
            var elem = $(val.dropable);

            vBUtils.resetCssClass(dragDropCss.dropableActive);
            vBUtils.resetCssClass(dragDropCss.draggingNotAllowed);
            vBUtils.removeCssClass(dragDropCss.dropableTargetFirst);

            var isDraggingElement = vBUtils.getVBData(elem).isDragging;
            if (isDraggingElement) {
                $(editor.elem).find('.' + dragDropCss.dragging)
                    .addClass(dragDropCss.draggingNotAllowed);
                elem = elem.parent();
            }

            elem.addClass(dragDropCss.dropableActive);

            var children = elem.children().toArray();
            if (children.length === 0) {
                return createTargetFirst(elem);
            } else {
                return children.sort(vBUtils.getSortByDistanceFn(val.ev))[0];
            }
        }

        function setDropableTarget(val) {
            if (!val.dropable) return;
            var target = val.dropable;
            var ev = val.ev;

            vBUtils.resetCssClass(dragDropCss.dropableTargetPrevious);
            vBUtils.resetCssClass(dragDropCss.dropableTargetAfter);

            var isBeforeTarget = false;
            if (!$(target).hasClass(dragDropCss.dropableTargetFirst)) {
                isBeforeTarget = vBUtils.getIsEvBeforeElem(ev, target);
                var targetCss = (isBeforeTarget ?
                    dragDropCss.dropableTargetPrevious : dragDropCss.dropableTargetAfter)

                $(target).addClass(targetCss);
            }
            vBUtils.setVBData(target, { isDraggingBefore: isBeforeTarget });
        }

        function createTargetFirst(elem) {
            var targetFirst = $('<div />')
                .html('&nbsp;')
                .addClass(dragDropCss.dropableTargetFirst);

            elem.append(targetFirst);
            return targetFirst[0];
        }

        function getChildestDropable() {
            return vBUtils.getChildest(editor.elem, dragDropCss.dropable);
        }

        function mapDropableAndEvent(dropable, ev) {
            return {
                dropable: dropable,
                ev: ev
            };
        }

    }
})();