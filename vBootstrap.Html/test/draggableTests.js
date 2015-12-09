/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/config/events.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="mock/lockServiceMock.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="../wwwroot/src/core/dragDrop/draggable.js" />

describe("draggable", function () {
    var testUtils = vBootstrap.test.utils;
    var events = vBootstrap.config.events;
    var draggable = vBootstrap.core.dragDrop.draggable;

    var draggableConfig;
    var isDragging;
    var dragDropService;
    var mousedownStream;

    beforeEach(initBeforeEach);

    function initBeforeEach() {
        isDragging = undefined;
        vBootstrap.config.streams.mock.setGlobalByCount(events.mousemove, 1);

        draggableConfig = {
            element: testUtils.getBootstrapElement(),
            getShadowTemplate: jasmine.createSpy('getShadowTemplate'),
            getOffset: jasmine.createSpy('getOffset')
        };

        mousedownStream = new Bacon.Bus();
        function fakeAsEventStream() { return mousedownStream; }
        draggableConfig.element.jElem.asEventStream = fakeAsEventStream;

        dragDropService = {
            draggingBus: {
                plug: jasmine.createSpy('plugDraggingBus')
            }
        };

        vBootstrap.core.dragDrop.DragShadow = jasmine.createSpy('DragShadow');
    }

    it("should drag when mousedown", function () {
        var lockService = testUtils.lock.getNotLockedService();
        draggableConfig.element.editor.mock.setDependencies(lockService, dragDropService)
        var draggableElem = new draggable.init(draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);
        mousedownStream.push({});

        expect(isDragging).toBe(true);
    });

    it("should create shadow", function () {
        var lockService = testUtils.lock.getNotLockedService();
        draggableConfig.element.editor.mock.setDependencies(lockService, dragDropService)
        var draggableElem = new draggable.init(draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);
        var draggingStream = dragDropService.draggingBus.plug.calls.allArgs()[0][0];
        draggingStream.onValue(function () { });
        mousedownStream.push({});

        expect(vBootstrap.core.dragDrop.DragShadow).toHaveBeenCalled();
        expect(draggableConfig.getShadowTemplate).toHaveBeenCalled();
    });

    it("should NOT drag when IS locked", function () {
        var lockService = testUtils.lock.getLockedService();
        draggableConfig.element.editor.mock.setDependencies(lockService, dragDropService)
        var draggableElem = new draggable.init(draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);
        var draggingStream = dragDropService.draggingBus.plug.calls.allArgs()[0][0];
        draggingStream.onValue(function () { });
        mousedownStream.push({});

        expect(vBootstrap.core.dragDrop.DragShadow).not.toHaveBeenCalled();
        expect(draggableConfig.getShadowTemplate).not.toHaveBeenCalled();
    });

    it("should NOT drag when NO mousedown", function () {
        var lockService = testUtils.lock.getNotLockedService();
        draggableConfig.element.editor.mock.setDependencies(lockService, dragDropService)
        var draggableElem = new draggable.init(draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);

        expect(isDragging).toBe(false);
        expect(draggableConfig.getOffset).not.toHaveBeenCalled();
        expect(draggableConfig.getShadowTemplate).not.toHaveBeenCalled();
    });

    it("should NOT drag when mousedown and mouseup", function () {
        var mouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        var lockService = testUtils.lock.getNotLockedService();
        draggableConfig.element.editor.mock.setDependencies(lockService, dragDropService)
        var draggableElem = new draggable.init(draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);
        mousedownStream.push({});
        mouseupBus.push({});

        expect(isDragging).toBe(false);
    });

    function setIsDragging(value) {
        isDragging = value;
    }
});