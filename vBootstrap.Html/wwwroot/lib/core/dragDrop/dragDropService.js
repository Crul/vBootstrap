(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    var globalStreams = vBootstrap.config.streams.global;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    var draggingBus = new Bacon.Bus();

    var globalStreams = vBootstrap.config.streams.global;

    var dragDropService = {
        startDrag: startDrag,
        onDragging: draggingBus,
        onStopDrag: globalStreams.mouseup
    };

    var unsubscribeDragMove;
    var unsubscribeSetDropableTarget;
    var unsubscribeOnDrop;

    var childestDropable = globalStreams.mousemove
        .map(getChildestDropable)
        .toProperty();

    var dropableTarget = childestDropable
        .sampledBy(globalStreams.mousemove, mapDropableAndEvent)
        .map(getDropableTarget)
        .toProperty();

    namespace('vBootstrap.core.dragDrop').dragDropService = dragDropService;

    function startDrag(ev) {
        unsubscribeSetDropableTarget = dropableTarget
            .sampledBy(globalStreams.mousemove, mapDropableAndEvent)
            .onValue(setDropableTarget);

        unsubscribeOnDrop = dropableTarget
            .sampledBy(globalStreams.mouseup, mapDropableAndEvent)
            .onValue(onDrop);

        unsubscribeDragMove = globalStreams.mousemove.onValue(function (ev) {
            draggingBus.push(ev);
        });

        if (ev)
            draggingBus.push(ev);
    }

    function onDrop(val) {
        var target = $(val.dropable);
        var dragging = $('.' + dragDropCss.dragging);

        unsubscribeDragMove();
        unsubscribeSetDropableTarget();
        unsubscribeOnDrop();

        if (target.length === 0) {
            console.warn('dragDropService.onDrop without target');
        }
        var targetParent = target.parent();
        if (dragging.length === 0) {
            console.warn('dragDropService.onDrop without dragging');
            return;
        }
        var source = dragging.data(selectors.vBData).source;
        if (target.hasClass(dragDropCss.dropableTargetFirst)) {
            targetParent.append(source);
        } else {
            var vBData = target.data(selectors.vBData) || {};
            if (vBData.isDraggingBefore) {
                target.before(source);
            } else {
                target.after(source);
            }
        }

        dragging.remove();
        resetDropables();
    }

    function getDropableTarget(val) {
        if (!val.dropable) return;
        var elem = $(val.dropable);
        var ev = val.ev;

        vBUtils.resetCssClass(dragDropCss.dropableActive);
        vBUtils.resetCssClass(dragDropCss.draggingNotAllowed);
        vBUtils.removeCssClass(dragDropCss.dropableTargetFirst);

        var isDraggingElement = (elem.data(selectors.vBData) || {}).isDragging;
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

        var targetPos = $(target).offset();
        var targetBottom = (targetPos.top + target.offsetHeight);
        var slope = (target.offsetHeight / target.offsetWidth);
        var relX = (ev.pageX - targetPos.left);
        var limitY = (targetBottom - relX * slope);

        var isBeforeTarget = ev.pageY < limitY;
        var targetCss = (isBeforeTarget ?
            dragDropCss.dropableTargetPrevious : dragDropCss.dropableTargetAfter)

        $(target).addClass(targetCss);

        var vBData = $(target).data(selectors.vBData) || {};
        vBData.isDraggingBefore = isBeforeTarget;
        $(target).data(selectors.vBData, vBData);
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
            var pos = $(child).offset();
            var width = child.offsetWidth;
            var height = child.offsetHeight;

            return (ev.pageX < (pos.left + width))
                && (ev.pageY < pos.top + height);
        }

        function byDistance(child1, child2) {
            var c1pos = $(child1).offset();
            var c2pos = $(child2).offset();

            var c1distX = c1pos.left + (child1.offsetWidth / 2) - ev.pageX;
            var c1distY = c1pos.top + (child1.offsetHeight / 2) - ev.pageY;
            var c1dist = Math.sqrt(c1distX * c1distX + c1distY * c1distY);

            var c2distX = c2pos.left + (child2.offsetWidth / 2) - ev.pageX;
            var c2distY = c2pos.top + (child2.offsetHeight / 2) - ev.pageY;
            var c2dist = Math.sqrt(c2distX * c2distX + c2distY * c2distY);

            if (c1dist < c2dist)
                return -1;

            if (c1dist > c2dist)
                return 1;

            return 0;
        }
    }

    function getChildestDropable() {
        return vBUtils.getChildest(dragDropCss.dropable);
    }

    function mapDropableAndEvent(dropable, ev) {
        return {
            dropable: dropable,
            ev: ev
        };
    }

    function resetDropables() {
        vBUtils.resetCssClass(dragDropCss.dropableActive);
        vBUtils.resetCssClass(dragDropCss.draggingNotAllowed);
        vBUtils.resetCssClass(dragDropCss.dropableTargetPrevious);
        vBUtils.resetCssClass(dragDropCss.dropableTargetAfter);
        vBUtils.removeCssClass(dragDropCss.dropableTargetFirst);
    }

})();