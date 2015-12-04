/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="mock/core/lockService.js" />
/// <reference path="mock/core/dropTargetSelector.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="../wwwroot/src/core/lock/locker.js" />
/// <reference path="../wwwroot/src/core/dragDrop/dragDropService.js" />

describe("drag&drop service", function () {
    var testUtils = vBootstrap.test.utils;
    var dropTargetSelector = new vBootstrap.core.dragDrop.dropTargetSelector();
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    var isDragging;
    var editor;
    var dragDropService;
    var unsubBefore;
    var source;
    var draggingElem;
    var target;
    var targetParentElem;

    beforeEach(initBeforeEach);

    function initBeforeEach() {
        if (unsubBefore) unsubBefore();

        isDragging = undefined;
        editor = { elem: testUtils.getDomElement() };
        dragDropService = new vBootstrap.core.dragDrop.dragDropService(editor);
        unsubBefore = dragDropService.isDragging.onValue(setIsDragging);
    }

    it("should be dragging when start dragging with {}", function () {

        dragDropService.startDrag({});

        expect(isDragging).toBe(true);
    });

    it("should NOT be dragging when start dragging without {}", function () {

        dragDropService.startDrag();

        expect(isDragging).toBe(false);
    });

    it("should NOT be dragging when dragging starts and ends", function () {
        var mouseUpBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        initBeforeEach(); // because overriding mouseup stream

        dragDropService.startDrag({});
        mouseUpBus.push({});

        expect(isDragging).toBe(false);
        expect(dropTargetSelector.stopBindingTarget).toHaveBeenCalled();
    });

    it("should insert source after target", function () {
        var mouseUpBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        initBeforeEach(); // because overriding mouseup stream
        initDomElements();

        dragDropService.startDrag({});
        dropTargetSelector.mock.targetBus.push($(target));
        mouseUpBus.push({});

        checkTargetDropped(targetParentElem, target, source);
    });

    it("should insert source before target", function () {
        var mouseUpBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        initBeforeEach(); // because overriding mouseup stream
        initDomElements({ isDraggingBefore: true });

        dragDropService.startDrag({});
        dropTargetSelector.mock.targetBus.push($(target));
        mouseUpBus.push({});

        checkTargetDropped(targetParentElem, source, target);
    });

    it("should append source to target parent", function (done) {
        var mouseUpBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        initBeforeEach(); // because overriding mouseup stream
        initDomElements({ isDraggingBefore: true });
        $(target).addClass(dragDropCss.dropableTargetFirst);

        dragDropService.startDrag({});
        dropTargetSelector.mock.targetBus.push($(target));
        mouseUpBus.push({});

        setTimeout(function () {
            checkTargetDropped(targetParentElem, target, source);
            done();
        }, 500);
    });

    function initDomElements(config) {
        config = config || {};

        source = testUtils.getDomElement();
        vBootstrap.utils.mock.setVBData({
            source: source,
            isDraggingBefore: config.isDraggingBefore
        });

        draggingElem = $(testUtils.getDomElement()).addClass(dragDropCss.dragging);
        $(editor.elem).append(draggingElem);

        target = testUtils.getDomElement();
        targetParentElem = testUtils.getDomElement();
        $(targetParentElem).append(target);
        $(editor.elem).append(targetParentElem);
    }

    function checkTargetDropped(targetParentElem, firstChildExpected, secondChildExpected) {
        var childrenCount = $(targetParentElem).children().length;
        expect(childrenCount).toBe(2);
        expect($(editor).find('.' + dragDropCss.dragging).length).toBe(0);

        if (childrenCount > 1) {
            expect($(targetParentElem).children()[0]).toBe(firstChildExpected);
            expect($(targetParentElem).children()[1]).toBe(secondChildExpected);
        }
    }

    function setIsDragging(value) {
        isDragging = value;
    }

});