(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    namespace('vBootstrap.core.dragDrop').dragDropService = vBDragDropService;

    function vBDragDropService(editor) {
        var unsubscribeDragMove;
        var unsubscribeOnDrop;

        var draggingBus = new Bacon.Bus();

        var isDragging = draggingBus.map(true)
          .merge(globalStreams.mouseup.map(false))
          .toProperty(false);

        var dragDropService = {
            isDragging: isDragging,
            startDrag: startDrag,
            onDragging: draggingBus,
            onStopDrag: globalStreams.mouseup
        };
        var dropTargetSelector = new vBootstrap.core.dragDrop
            .dropTargetSelector(editor, dragDropService);

        return dragDropService;

        function startDrag(ev) {
            dropTargetSelector.startBindingTarget();

            unsubscribeOnDrop = dropTargetSelector.target
                .sampledBy(globalStreams.mouseup, mapDropableAndEvent)
                .onValue(onDrop);

            unsubscribeDragMove = globalStreams.mousemove.onValue(pushBus);
            
            function pushBus(ev) {
                draggingBus.push(ev);
            }

            if (ev)
                draggingBus.push(ev);
        }

        function onDrop(val) {
            var target = $(val.dropable);
            var dragging = $(editor.elem).find('.' + dragDropCss.dragging);

            unsubscribeDragMove();
            unsubscribeOnDrop();
            dropTargetSelector.stopBindingTarget();

            if (target.length === 0) {
                console.warn('dragDropService.onDrop without target');
            }

            var targetParent = target.parent();
            if (dragging.length === 0) {
                console.warn('dragDropService.onDrop without dragging');
                return;
            }
            var source = vBUtils.getVBData(dragging).source;
            if (target.hasClass(dragDropCss.dropableTargetFirst)) {
                targetParent.append(source);
            } else {
                if (vBUtils.getVBData(target).isDraggingBefore) {
                    target.before(source);
                } else {
                    target.after(source);
                }
            }

            dragging.remove();
            resetDropables();
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

    }
})();