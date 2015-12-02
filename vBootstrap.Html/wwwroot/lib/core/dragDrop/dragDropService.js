(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var events = vBootstrap.config.events;
    var selectors = vBootstrap.config.selectors;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;
    var onStopDrag = $(document).asEventStream(events.mouseup);

    var draggingBus = new Bacon.Bus();

    //var isDragging = draggingBus.map(true)
    //  .merge(globalMouseup.map(false))
    //  .toProperty(false);

    var dragDropService = {
        //isDragging: isDragging,
        startDrag: startDrag,
        onDragging: draggingBus,
        onStopDrag: onStopDrag
    };

    var childestDropable = draggingBus
        .map(getChildestDropable)
        .toProperty();

    var dropableTarget = childestDropable
        .sampledBy(draggingBus, mapDropableAndEvent)
        .map(getDropableTarget)
        .toProperty();

    var unsubscribeSetDropableTarget;
    var unsubscribeOnDrop;

    function startDrag(dragmove, ev) {
        draggingBus.plug(dragmove);

        unsubscribeSetDropableTarget = dropableTarget
            .sampledBy(draggingBus, mapDropableAndEvent)
            .onValue(setDropableTarget);

        unsubscribeOnDrop = dropableTarget
            .sampledBy(onStopDrag, mapDropableAndEvent)
            .onValue(onDrop);

        if (ev)
            draggingBus.push(ev);
    }

    namespace('vBootstrap.core.dragDrop').dragDropService = dragDropService;

    function onDrop(val) {
        unsubscribeSetDropableTarget();
        unsubscribeOnDrop();

        var target = $(val.dropable);
        var targetParent = target.parent();
        var dragging = $('.' + dragDropCss.dragging);
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

        var targetPos = $(target).position();
        var targetBottom = (targetPos.top + target.offsetHeight);
        var slope = (target.offsetHeight / target.offsetWidth);
        var relX = (ev.clientX - targetPos.left);
        var limitY = (targetBottom - relX * slope);

        var isBeforeTarget = ev.clientY < limitY;
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
            target = children[children.length - 1];
        else
            target = target.sort(byDistance)[0];

        return target;

        function onTopAndLeft(child) {
            var pos = $(child).position();
            var width = child.offsetWidth;
            var height = child.offsetHeight;

            return (ev.clientX < (pos.left + width))
                && (ev.clientY < pos.top + height);
        }

        function byDistance(child1, child2) {
            var c1pos = $(child1).position();
            var c2pos = $(child2).position();

            var c1distX = c1pos.left + (child1.offsetWidth / 2) - ev.clientX;
            var c1distY = c1pos.top + (child1.offsetHeight / 2) - ev.clientY;
            var c1dist = Math.sqrt(c1distX * c1distX + c1distY * c1distY);

            var c2distX = c2pos.left + (child2.offsetWidth / 2) - ev.clientX;
            var c2distY = c2pos.top + (child2.offsetHeight / 2) - ev.clientY;
            var c2dist = Math.sqrt(c2distX * c2distX + c2distY * c2distY);

            if (c1dist < c2dist)
                return -1;

            if (c1dist > c2dist)
                return 1;

            return 0;
        }
    }

    function getChildestDropable() {
        var dropables = $('.' + dragDropCss.dropable);
        if (dropables.length === 0)
            return;

        var ascendants = dropables.parents();
        for (var i = 0; i < dropables.length; i++) {
            var dropable = dropables[i];
            if (ascendants.index(dropable) < 0)
                return dropable;
        }
        throw 'dragDropService.getChildestDropable: error';
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