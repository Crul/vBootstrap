﻿/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/config/events.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="mock/core/lockService.js" />
/// <reference path="../wwwroot/src/core/dragDrop/draggable.js" />

describe("draggable", function () {
    var testUtils = vBootstrap.test.utils;
    var events = vBootstrap.config.events;
    var draggable = vBootstrap.core.dragDrop.draggable;

    var draggableConfig;
    var isDragging;
    var dragShadowSpy;
    var dragDropService = {};
    var mousedownStream;
    var onDispose;
    vBootstrap.utils.getVBData = function () {
        return { onDispose: setOnDispose };
    };

    beforeEach(initBeforeEach);
    afterEach(initAfterEach);

    function initBeforeEach() {
        onDispose = undefined;
        isDragging = undefined;
        vBootstrap.config.streams.mock.setGlobalByCount(events.mousemove, 1);

        dragShadowSpy = jasmine.createSpy('dragShadow')
        namespace('vBootstrap.core.dragDrop').dragShadow = dragShadowSpy;

        draggableConfig = {
            element: $(testUtils.getDomElement()),
            getShadowTemplate: jasmine.createSpy('getShadowTemplate'),
            getOffset: jasmine.createSpy('getOffset')
        };

        mousedownStream = new Bacon.Bus();
        draggableConfig.element.asEventStream = fakeAsEventStream;

        function fakeAsEventStream() {
            return mousedownStream;
        }
    }

    function initAfterEach() {
        if (onDispose) {
            for (var i = 0; i < onDispose.length; i++)
                onDispose[i]();
        }
    }

    it("should NOT drag when NO mousedown", function (done) {
        var lockService = testUtils.lock.getNotLockedService();
        var editor = { lockService: lockService };
        var draggableElem = draggable.init(editor, draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);

        expect(isDragging).toBe(false);
        expect(draggableConfig.getOffset).not.toHaveBeenCalled();
        expect(draggableConfig.getShadowTemplate).not.toHaveBeenCalled();

        done();
    });

    it("should drag when mousedown", function (done) {
        var lockService = testUtils.lock.getNotLockedService();
        var editor = { lockService: lockService };
        var draggableElem = draggable.init(editor, draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);
        mousedownStream.push({});

        expect(isDragging).toBe(true);
        expect(draggableConfig.getOffset).toHaveBeenCalled();
        expect(draggableConfig.getShadowTemplate).toHaveBeenCalled();

        done();
    });

    it("should NOT drag when mousedown and mouseup", function (done) {
        var mouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        var lockService = testUtils.lock.getNotLockedService();
        var editor = { lockService: lockService };
        var draggableElem = draggable.init(editor, draggableConfig);

        draggableElem.isDragging.onValue(setIsDragging);
        mousedownStream.push({});
        mouseupBus.push({});

        expect(isDragging).toBe(false);
        expect(draggableConfig.getOffset).toHaveBeenCalled();
        expect(draggableConfig.getShadowTemplate).toHaveBeenCalled();
        expect(lockService.lockOn).toHaveBeenCalledWith(draggableElem.isDragging);

        done();
    });

    function setIsDragging(value) {
        isDragging = value;
    }

    function setOnDispose(value) {
        onDispose = value;
    }
});