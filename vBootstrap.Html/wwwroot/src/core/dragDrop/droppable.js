(function () {
    "use strict";
    var vBUtils = namespace('vBootstrap.utils');
    var globalStreams = namespace('vBootstrap.config.streams.global');
    var dragDropConfig = namespace('vBootstrap.config.dragDrop');

    namespace('vBootstrap.core.dragDrop').droppable = {
        init: initDroppable
    };

    function initDroppable(element) {
        var dependencies = {
            dragDropService: namespace('vBootstrap.core.dragDrop.DragDropService'),
            dropTargetSelector: namespace('vBootstrap.core.dragDrop.DropTargetSelector'),
        };
        element.editor.resolve(dependencies, load, element);
    }

    function load(dragDropService, dropTargetSelector) {
        var element = this;
        var jElem = element.jElem;

        var droppableStream = Bacon
            .combineWith(getElementAndEventIfValidDroppable, dragDropService.dragging, globalStreams.mousemove);

        dropTargetSelector.droppables.add(droppableStream);
        element.onDispose(removeDroppable);

        function getElementAndEventIfValidDroppable(dragging, ev) {
            if (!ev) return;
            var elementAndEvent = vBUtils.getElementAndEventIfIsOverFn(element, dragDropConfig.threshold)(ev);
            if (!elementAndEvent || !checkDragging(dragging)) return;
            return elementAndEvent;
        }

        function checkDragging(dragging) {
            if (!dragging) return false;

            var isDraggingElem = (dragging.source == jElem);
            if (isDraggingElem) {
                dragging.jElem.addClass(dragDropConfig.cssClasses.draggingNotAllowed);
                return false;
            }

            var isDescendantOfDragging = (dragging.source.find(jElem).length > 0);
            if (isDescendantOfDragging) {
                dragging.jElem.addClass(dragDropConfig.cssClasses.draggingNotAllowed);
                return false;
            }

            return true;
        }

        function removeDroppable() {
            dropTargetSelector.droppables.remove(droppableStream);
        }
    }
})();