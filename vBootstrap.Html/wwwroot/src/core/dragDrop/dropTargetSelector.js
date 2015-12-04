(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    namespace('vBootstrap.core.dragDrop').dropTargetSelector = vBDropTargetSelector;

    function vBDropTargetSelector(editor, dragDropService) {
        var draggingBus = new Bacon.Bus();

        var childestDropable = globalStreams.mousemove
            .filter(dragDropService.isDragging)
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
            var ev = val.ev;

            vBUtils.resetCssClass(dragDropCss.dropableActive);
            vBUtils.resetCssClass(dragDropCss.draggingNotAllowed);
            vBUtils.removeCssClass(dragDropCss.dropableTargetFirst);

            var isDraggingElement = vBUtils.getVBData(elem).isDragging;
            if (isDraggingElement) {
                $('.' + dragDropCss.draggingNotAllowed)
                    .addClass(dragDropCss.draggingNotAllowed);
                elem = elem.parent();
            }

            elem.addClass(dragDropCss.dropableActive);

            var children = elem.children().toArray();
            if (children.length === 0) {
                return createTargetFirst(elem);
            } else {
                return getClosestChild(children, ev);
            }
        }

        function setDropableTarget(val) {
            if (!val.dropable) return;
            var target = val.dropable;
            var ev = val.ev;

            vBUtils.resetCssClass(dragDropCss.dropableTargetPrevious);
            vBUtils.resetCssClass(dragDropCss.dropableTargetAfter);

            var isBeforeTarget = getIsBeforeTarget(ev, target);
            var targetCss = (isBeforeTarget ?
                dragDropCss.dropableTargetPrevious : dragDropCss.dropableTargetAfter)

            $(target).addClass(targetCss);
            vBUtils.setVBData(target, { isDraggingBefore: isBeforeTarget });
        }

        function getIsBeforeTarget(ev, target) {
            var jTarget = $(target);
            var targetPos = jTarget.offset();
            var targetSize = { width: jTarget.outerWidth(), height: jTarget.outerHeight() };
            var targetBottom = (targetPos.top + targetSize.height);
            var slope = (targetSize.height / targetSize.width);
            var relX = (ev.pageX - targetPos.left);
            var limitY = (targetBottom - relX * slope);

            var isBeforeTarget = ev.pageY < limitY;
            return isBeforeTarget;
        }

        function createTargetFirst(elem) {
            var targetFirst = $('<div />')
                .html('&nbsp;')
                .addClass(dragDropCss.dropableTargetFirst);

            elem.append(targetFirst);
            return targetFirst[0];
        }

        function getClosestChild(children, ev) {
            var target = children.filter(onTopAndLeft);
            if (target.length === 0)
                return children[children.length - 1];
            else
                return target.sort(byDistance)[0];

            function onTopAndLeft(child) {
                var jChild = $(child);
                var pos = jChild.offset();
                var width = jChild.outerWidth();
                var height = jChild.outerHeight();

                return (ev.pageX < (pos.left + width))
                    && (ev.pageY < pos.top + height);
            }

            function byDistance(child1, child2) {
                var jChild1 = $(child1);
                var jChild2 = $(child2);
                var c1pos = jChild1.offset();
                var c2pos = jChild2.offset();

                var c1distX = c1pos.left + (jChild1.outerWidth() / 2) - ev.pageX;
                var c1distY = c1pos.top + (jChild1.outerHeight() / 2) - ev.pageY;
                var c1dist = Math.sqrt(c1distX * c1distX + c1distY * c1distY);

                var c2distX = c2pos.left + (jChild2.outerWidth() / 2) - ev.pageX;
                var c2distY = c2pos.top + (jChild2.outerHeight() / 2) - ev.pageY;
                var c2dist = Math.sqrt(c2distX * c2distX + c2distY * c2distY);

                if (c1dist < c2dist)
                    return -1;

                if (c1dist > c2dist)
                    return 1;

                return 0;
            }
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