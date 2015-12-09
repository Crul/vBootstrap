/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/config/events.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="mock/lockServiceMock.js" />
/// <reference path="../wwwroot/src/core/resize/resizable.js" />

describe("resizable", function () {
    var testUtils = vBootstrap.test.utils;
    var events = vBootstrap.config.events;

    var globalMouseupBus;
    var globalMousemoveBus;
    var isResizing;
    var element;
    var resizeFn;
    var isOverFn;
    var config;

    beforeEach(initBeforeEach);

    function initBeforeEach() {
        isResizing = undefined;
        globalMouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        globalMousemoveBus = vBootstrap.config.streams.mock.setGlobalPushable('mousemove');
        config = {
            element: testUtils.getBootstrapElement(),
            resize: jasmine.createSpy('resizeFn'),
            isOver: jasmine.createSpy('isOverFn'),
            resizableClass: 'resizableClass',
            resizingClass: 'resizingClass'
        };
        $(document.body).attr('class', '');
    }

    it("should set resizing on element", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.isResizing = undefined;
        config.element.editor.mock.setDependencies(lockService);

        vBootstrap.core.resize.resizable.init(config);

        expect(config.element.isResizing).not.toBe(undefined);
    });

    it("should lock on resizing", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);

        vBootstrap.core.resize.resizable.init(config);

        expect(lockService.lockOn).toHaveBeenCalled();
    });

    it("should set unsub function on dispose", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);

        vBootstrap.core.resize.resizable.init(config);

        var onDisposeArgs = config.element.onDispose.calls.allArgs()[0][0];
        expect(onDisposeArgs.length).toBe(7);
    });

    it("should set isResizing TRUE when mouse down on over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect(isResizing).toBe(true);
    });

    it("should NOT set isResizing TRUE when mouse down on over and IS locked", function () {
        var lockService = testUtils.lock.getLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect(isResizing).toBe(false);
    });

    it("should NOT set isResizing TRUE when NO mouse down and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});

        expect(isResizing).toBe(false);
    });

    it("should NOT set isResizing TRUE when mouse down NOT over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(false);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect(isResizing).toBe(false);
    });

    it("should set isResizing FALSE when mouse up", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});
        globalMouseupBus.push({});

        expect(isResizing).toBe(false);
    });

    it("should set resizable class when is over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});

        expect(config.element.jElem.attr('class')).toMatch(config.resizableClass);
    });

    it("should NOT set resizable class when is NOT over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(false);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});

        expect(config.element.jElem.attr('class')).not.toMatch(config.resizableClass);
    });

    it("should NOT set resizable class when is over and IS locked", function () {
        var lockService = testUtils.lock.getLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});

        expect(config.element.jElem.attr('class')).not.toMatch(config.resizableClass);
    });

    it("should remove resizable class when mouse out", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mouseout.push({});

        expect(config.element.jElem.attr('class')).not.toMatch(config.resizableClass);
    });

    it("should add resizing class when mouse down over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect(config.element.jElem.attr('class')).toMatch(config.resizingClass);
    });

    it("should NOT add resizing class when mouse down NOT over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(false);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect(config.element.jElem.attr('class')).not.toMatch(config.resizingClass);
    });

    it("should NOT add resizing class when mouse down over and IS locked", function () {
        var lockService = testUtils.lock.getLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect(config.element.jElem.attr('class')).not.toMatch(config.resizingClass);
    });

    it("should remove resizing class when mouse up", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});
        globalMouseupBus.push({});

        expect(config.element.jElem.attr('class')).not.toMatch(config.resizingClass);
    });

    it("should add resizing class to BODY when mouse down over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect($(document.body).attr('class')).toMatch(config.resizingClass);
    });

    it("should NOT add resizing class to BODY when mouse down NOT over and NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(false);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect($(document.body).attr('class')).not.toMatch(config.resizingClass);
    });

    it("should NOT add resizing class to BODY when mouse down over and IS locked", function () {
        var lockService = testUtils.lock.getLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});

        expect($(document.body).attr('class')).not.toMatch(config.resizingClass);
    });

    it("should remove resizing class from BODY when mouse up", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});
        globalMouseupBus.push({});

        expect($(document.body).attr('class')).not.toMatch(config.resizingClass);
    });

    it("should resize on mouse down over and mouse move", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});
        var globalMousemoveEv = {};
        globalMousemoveBus.push(globalMousemoveEv);

        expect(config.resize).toHaveBeenCalledWith(globalMousemoveEv);
    });

    it("should NOT resize on mouse move when mouse up", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});
        globalMousemoveBus.push({});
        var resizeCallsBeforeMouseup = config.resize.calls.count();
        globalMouseupBus.push({});
        globalMousemoveBus.push({});

        expect(config.resize.calls.count()).toBe(resizeCallsBeforeMouseup);
    });

    it("should stop doing things on dispose", function () {
        var lockService = testUtils.lock.getNotLockedService();
        config.element.editor.mock.setDependencies(lockService);
        config.isOver.and.returnValue(true);

        vBootstrap.core.resize.resizable.init(config);
        config.element.isResizing.onValue(setIsResizing);
        config.element.elemStreams.mousemove.push({});
        config.element.elemStreams.mousedown.push({});
        globalMousemoveBus.push({});
        var resizeCallsBeforeMouseup = config.resize.calls.count();
        var onDisposeFns = config.element.onDispose.calls.argsFor(0)[0];
        $(onDisposeFns).each(executeFn);
        globalMousemoveBus.push({});

        expect(config.resize.calls.count()).toBe(resizeCallsBeforeMouseup);
    });

    function setIsResizing(value) {
        isResizing = value;
    }

    function executeFn(i, fn) {
        fn();
    }
});