(function () {
    "use strict";
    var vBUtils = namespace('vBootstrap.utils');
    var dragDropCss = namespace('vBootstrap.config.dragDrop.cssClasses');

    function FooElementFactory(editor) {
        this.config = {
            selector: dragDropCss.droppable,
            features: []
        };
        vBootstrap.core.ElementFactory.call(this, editor);
    };
    FooElementFactory.prototype = namespace('vBootstrap.core.ElementFactory').prototype;

    namespace('vBootstrap.core.dragDrop').DropTargetSelector = DropTargetSelector;
    vBootstrap.addFactory(DropTargetSelector);

    function DropTargetSelector(editor) {
        this.editor = editor;
        this.droppables = new vBootstrap.CustomStreamArray();
        this.droppables.add(Bacon.constant());
        editor.dropTargetSelector = this;

        addExistingDroppables(editor);

        var dependencies = {
            dragDropService: namespace('vBootstrap.core.dragDrop.DragDropService')
        };
        editor.resolve(dependencies, load, this);

    }

    function addExistingDroppables(editor) {
        var elementFactory = new FooElementFactory(editor);
        elementFactory.resetFeatures([namespace('vBootstrap.core.dragDrop.droppable')]);
        $('.' + dragDropCss.droppable).each(addDroppableStream);

        function addDroppableStream(i, elem) {
            elementFactory.create(elem);
        }
    }

    function load(dragDropService) {
        var droppableTarget = this.droppables.bus
            .filter(dragDropService.isDragging)
            .filter(vBUtils.hasArrayElems)
            .map(vBUtils.getChildest)
            .map(getTarget)
            .skipDuplicates()
            .toProperty();

        var disposeTargetCss = droppableTarget.onValue(setTargetCss);
        dragDropService.droppableBus.plug(droppableTarget);
        this.editor.bus.onEnd(disposeTargetCss);

        var disposeResetNotAllowed = droppableTarget.map(getElement)
            .toProperty()
            .skipDuplicates()
            .onValue(resetNotAllowed);
        this.editor.bus.onEnd(disposeResetNotAllowed);
    }

    function getTarget(droppable) {
        if (!droppable.element) return;

        var jElem = droppable.element.jElem;

        vBUtils.resetCssClass(dragDropCss.droppableActive);
        vBUtils.removeCssClass(dragDropCss.droppableTargetFirst);

        jElem.addClass(dragDropCss.droppableActive);

        var children = jElem.children().toArray();
        if (children.length === 0) {
            droppable.isFakeTarget = true;
            droppable.jTarget = createFakeTarget(jElem);
        } else {
            var sortByDistFn = vBUtils.getSortByDistanceFn(droppable.ev);
            droppable.jTarget = $(children.sort(sortByDistFn)[0]);
        }

        return droppable;
    }

    function setTargetCss(droppable) {
        vBUtils.resetCssClass(dragDropCss.droppableTargetPrevious);
        vBUtils.resetCssClass(dragDropCss.droppableTargetAfter);

        if (!droppable.isFakeTarget) {
            var jTarget = droppable.jTarget;
            droppable.isDraggingBefore = vBUtils.getIsEvBeforeElem(droppable.ev, jTarget[0]);

            var targetCss = (droppable.isDraggingBefore ?
                dragDropCss.droppableTargetPrevious : dragDropCss.droppableTargetAfter)

            jTarget.addClass(targetCss);
        }
    }

    function createFakeTarget(elem) {
        var fakeTarget = $('<div />')
            .html('&nbsp;')
            .addClass(dragDropCss.droppableTargetFirst);

        elem.append(fakeTarget);
        return fakeTarget;
    }

    function getElement(droppable) {
        return droppable.element.jElem;
    }

    function resetNotAllowed() {
        vBUtils.resetCssClass(dragDropCss.draggingNotAllowed);
    }
})();