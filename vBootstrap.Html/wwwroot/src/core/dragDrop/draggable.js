(function () {
    "use strict";
    var vBUtils = namespace('vBootstrap.utils');
    var events = namespace('vBootstrap.config.events');
    var globalStreams = namespace('vBootstrap.config.streams.global');
    var dragDropConfig = namespace('vBootstrap.config.dragDrop');
    var dragDrop = namespace('vBootstrap.core.dragDrop');

    namespace('vBootstrap.core.dragDrop').draggable = {
        init: initDraggable
    };

    function initDraggable(config) {
        var draggable = { config: config };
        var dependencies = {
            lockService: namespace('vBootstrap.core.lock.Locker'),
            dragDropService: namespace('vBootstrap.core.dragDrop.DragDropService')
        };
        config.element.editor.resolve(dependencies, load, draggable);
        return draggable;
    }

    function load(lockService, dragDropService) {
        var config = this.config;
        var element = config.element;

        var mousedownNotLocked = element.jElem
            .asEventStream(events.mousedown)
            .filter(lockService.isNotLocked);

        var draggingStream = mousedownNotLocked.map(createDragging);
        dragDropService.draggingBus.plug(draggingStream);

        this.isDragging = mousedownNotLocked.map(true)
          .merge(globalStreams.mouseup.map(false))
          .toProperty(false);

        var dispose = this.isDragging.assign(element.jElem, 'toggleClass', dragDropConfig.cssClasses.beingDragged);
        if (element.onDispose)
            element.onDispose(dispose);

        function createDragging(ev) {
            var offset = (config.getOffset ? config.getOffset(ev) : undefined);
            var shadowTemplate = config.getShadowTemplate();
            return new dragDrop.DragShadow(element.editor, shadowTemplate, ev, offset);
        }
    }
})();