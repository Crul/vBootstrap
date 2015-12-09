(function () {
    "use strict";
    var vBUtils = namespace('vBootstrap.utils');
    var globalStreams = namespace('vBootstrap.config.streams.global');
    var dragDropCss = namespace('vBootstrap.config.dragDrop.cssClasses');

    namespace('vBootstrap.core.dragDrop').DragDropService = DragDropService;
    vBootstrap.addFactory(DragDropService);

    function DragDropService(editor) {
        this.editor = editor;
        editor.dragDropService = this;

        this.draggingBus = new Bacon.Bus();
        this.dragging = this.draggingBus.toProperty();

        this.droppableBus = new Bacon.Bus();
        this.droppable = this.droppableBus.toProperty();

        this.isDragging = this.draggingBus
            .filter(Bacon._.id).map(true)
            .merge(globalStreams.mouseup.map(false))
            .toProperty(false);

        this.onStopDrag = globalStreams.mouseup;

        var dependencies = {
            lockService: namespace('vBootstrap.core.lock.Locker')
        };
        editor.resolve(dependencies, load, this);
    }

    function load(lockService) {
        lockService.lockOn(this.isDragging);

        var dragDropService = this;
        this.dragging.skipDuplicates().onValue(function (dragging) {
            if (dragging) startDrag.call(dragDropService, dragging);
        });
    }

    function startDrag(dragging) {
        if (this.unsubscribeOnDrop)
            this.unsubscribeOnDrop()

        if (!dragging) return;

        var dragDropService = this;
        var draggingAndDroppable = Bacon.combineAsArray(Bacon.constant(dragging), this.droppable);

        this.unsubscribeOnDrop = draggingAndDroppable
            .skipDuplicates()
            .sampledBy(globalStreams.mouseup)
            .onValue(function (value) {
                onDrop.call(dragDropService, value);
            });

        this.droppableBus.push();
    }

    function onDrop(draggingAndDroppable) {
        this.unsubscribeOnDrop();

        var dragging = draggingAndDroppable[0];
        if (!dragging)
            throw 'dragDropService.onDrop without dragging';

        var droppable = draggingAndDroppable[1];
        if (droppable && droppable.jTarget.length > 0)
            addToTarget(dragging, droppable);
        else
            console.info('dragDropService.onDrop without droppable');

        dragging.remove();

        resetDroppables();
    }

    function addToTarget(dragging, droppable) {
        var source = dragging.source;
        if (droppable.isDraggingBefore) {
            droppable.jTarget.before(source);
        } else {
            droppable.jTarget.after(source);
        }
    }

    function resetDroppables() {
        vBUtils.resetCssClass(dragDropCss.droppableActive);
        vBUtils.resetCssClass(dragDropCss.draggingNotAllowed);
        vBUtils.resetCssClass(dragDropCss.droppableTargetPrevious);
        vBUtils.resetCssClass(dragDropCss.droppableTargetAfter);
        vBUtils.removeCssClass(dragDropCss.droppableTargetFirst);
    }
})();