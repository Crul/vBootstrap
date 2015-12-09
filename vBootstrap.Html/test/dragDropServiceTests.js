/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="mock/lockServiceMock.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="../wwwroot/src/core/lock/locker.js" />
/// <reference path="../wwwroot/src/core/dragDrop/dragDropService.js" />

describe("drag&drop service", function () {
    var testUtils = vBootstrap.test.utils;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    var isDragging;
    var editor;
    var dragDropService;
    var source;
    var target;
    var targetParentElem;
    var lockService;

    beforeEach(initBeforeEach);

    function initBeforeEach() {
        isDragging = undefined;
        lockService = testUtils.lock.getNotLockedService();
        editor = testUtils.getEditor();
        editor.mock.setDependencies(lockService);
        vBootstrap.utils.resetCssClass = jasmine.createSpy('resetCssClass');
        vBootstrap.utils.removeCssClass = jasmine.createSpy('removeCssClass');
    }

    it("should be dragging when start dragging with {}", function () {

        createDragDropServiceAndPushDragging({});

        expect(isDragging).toBe(true);
    });

    it("should NOT be dragging when dragging undefined", function () {

        createDragDropServiceAndPushDragging(undefined);

        expect(isDragging).toBe(false);
    });

    it("should NOT be dragging when dragging starts and ends", function () {
        var mouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        var removeFn = jasmine.createSpy('remove');

        createDragDropServiceAndPushDragging({ remove: removeFn });
        mouseupBus.push({});

        expect(isDragging).toBe(false);
    });

    it("should insert source before target", function () {
        var mouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        initDomElements();
        var dragging = {
            remove: jasmine.createSpy('removeDragging'),
            source: source
        };
        var droppable = {
            jTarget: target,
            isDraggingBefore: true
        };

        createDragDropServiceAndPushDragging(dragging);
        dragDropService.droppableBus.push(droppable);
        mouseupBus.push({});

        checkTargetDropped(targetParentElem, source, target);
    });

    it("should insert source after target", function () {
        var mouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        initDomElements();
        var dragging = {
            remove: jasmine.createSpy('removeDragging'),
            source: source
        };

        createDragDropServiceAndPushDragging(dragging);
        dragDropService.droppableBus.push({ jTarget: target });
        mouseupBus.push({});

        console.log(targetParentElem[0].outerHTML);
        checkTargetDropped(targetParentElem, target, source);
    });

    it("should remove dragging", function () {
        var mouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        var dragging = {
            remove: jasmine.createSpy('removeDragging'),
            source: source,
            isDraggingBefore: true
        };

        createDragDropServiceAndPushDragging(dragging);
        dragDropService.droppableBus.push({ jTarget: target });
        mouseupBus.push({});

        expect(dragging.remove).toHaveBeenCalled();
    });

    it("should lock on dragging", function () {
        var lockOnFn;
        lockService.lockOn = setLockOnFn;
        function setLockOnFn(fn) { lockOnFn = fn; }

        dragDropService = new vBootstrap.core.dragDrop.DragDropService(editor);

        expect(dragDropService.isDragging).toBe(lockOnFn);
    });

    function createDragDropServiceAndPushDragging(draggingEvent) {
        dragDropService = new vBootstrap.core.dragDrop.DragDropService(editor);
        dragDropService.isDragging.onValue(setIsDragging);
        dragDropService.draggingBus.push(draggingEvent);
    }

    function initDomElements() {
        source = testUtils.getDomElement();

        target = testUtils.getDomElement();
        targetParentElem = testUtils.getDomElement();
        targetParentElem.append(target);
        editor.jElem.append(targetParentElem);
    }

    function checkTargetDropped(targetParentElem, firstChildExpected, secondChildExpected) {
        var childrenCount = $(targetParentElem).children().length;
        expect(childrenCount).toBe(2);
        expect($(targetParentElem).children()[0]).toBe(firstChildExpected[0]);
        expect($(targetParentElem).children()[1]).toBe(secondChildExpected[0]);
    }

    function setIsDragging(value) {
        isDragging = value;
    }
});