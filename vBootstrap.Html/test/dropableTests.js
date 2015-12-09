/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="../wwwroot/src/core/dragDrop/droppable.js" />

describe("droppable", function () {
    var testUtils = vBootstrap.test.utils;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    var editor;
    var element;
    var draggingBus;
    var dragDropService;
    var dropTargetSelector;
    var droppableOutput;

    beforeEach(initBeforeEach);

    function initBeforeEach() {
        droppableOutput = undefined;
        onDispose = undefined;
        element = testUtils.getBootstrapElement();
        element.source = testUtils.getDomElement();
        editor = element.editor;
        draggingBus = new Bacon.Bus();
        dragDropService = {
            dragging: draggingBus
        };
        dropTargetSelector = {
            droppables: {
                add: jasmine.createSpy('addDroppableStream'),
                remove: jasmine.createSpy('removeDroppableStream')
            }
        };
        editor.mock.setDependencies(dragDropService, dropTargetSelector);
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 1);
    }

    it("should set droppable output", function () {
        setElementAndEvent();

        var droppableStream = initDroppableAndBindDroppableStream();
        draggingBus.push(element);

        expect(vBootstrap.utils.getElementAndEventIfIsOverFn)
            .toHaveBeenCalledWith(element, jasmine.any(Number));
        expect(dropTargetSelector.droppables.add).toHaveBeenCalled();
        expect(droppableOutput).toBe(elementAndEvent);
    });
    
    it("should set droppable to undefined when is NOT over", function () {
        setElementAndEvent();

        var droppableStream = initDroppableAndBindDroppableStream();
        draggingBus.push(element);
        vBootstrap.utils.getElementAndEventIfIsOverFn.and.returnValue(function () { return; });
        draggingBus.push(element);

        expect(droppableOutput).toBe(undefined);
    });
    
    it("should remove droppable stream when stops", function () {

        vBootstrap.core.dragDrop.droppable.init(element);
        expect(element.onDispose).toHaveBeenCalled();
        var removeDroppable = element.onDispose.calls.allArgs()[0][0];
        removeDroppable();

        var droppableStream = dropTargetSelector.droppables.add.calls.allArgs()[0][0];
        expect(dropTargetSelector.droppables.remove).toHaveBeenCalledWith(droppableStream);
    });

    it("should NOT set droppable if no event", function () {
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 0);
        setElementAndEvent();

        var droppableStream = initDroppableAndBindDroppableStream();
        draggingBus.push(element);

        expect(droppableOutput).toBe(undefined);
    });

    it("should NOT set droppable if no dragging", function () {
        setElementAndEvent();

        var droppableStream = initDroppableAndBindDroppableStream();

        expect(droppableOutput).toBe(undefined);
    });

    it("should NOT set droppable if element is dragging source", function () {
        setElementAndEvent();
        element.source = element.jElem;

        var droppableStream = initDroppableAndBindDroppableStream();
        draggingBus.push(element);

        expect(droppableOutput).toBe(undefined);
    });

    it("should set dragging-not-allowed class if element is dragging source", function () {
        setElementAndEvent();
        element.source = element.jElem;

        var droppableStream = initDroppableAndBindDroppableStream();
        draggingBus.push(element);

        expect(element.jElem.attr('class')).toMatch(dragDropCss.draggingNotAllowed);
    });

    it("should NOT set droppable if element is descendant of dragging source", function () {
        setElementAndEvent();
        element.source.append(element.jElem);

        var droppableStream = initDroppableAndBindDroppableStream();
        draggingBus.push(element);

        expect(droppableOutput).toBe(undefined);
    });

    it("should set dragging-not-allowed class if element is descendant of dragging source", function () {
        setElementAndEvent();
        element.source.append(element.jElem);

        var droppableStream = initDroppableAndBindDroppableStream();
        draggingBus.push(element);

        expect(element.jElem.attr('class')).toMatch(dragDropCss.draggingNotAllowed);
    });

    function initDroppableAndBindDroppableStream() {
        vBootstrap.core.dragDrop.droppable.init(element);
        var droppableStream = dropTargetSelector.droppables.add.calls.allArgs()[0][0];
        droppableStream.onValue(setDroppableOutput);
        return droppableStream;
    }

    function setElementAndEvent() {
        elementAndEvent = { element: element, ev: {} };
        vBootstrap.utils.getElementAndEventIfIsOverFn = jasmine
            .createSpy('getElementAndEventIfIsOverFn')
            .and.returnValue(Bacon._.always(elementAndEvent));
    }

    function setDroppableOutput(value) {
        droppableOutput = value;
    }
});