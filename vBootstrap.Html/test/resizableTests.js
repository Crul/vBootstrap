/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/config/events.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/core/lockService.js" />
/// <reference path="../wwwroot/src/core/resize/resizable.js" />

describe("resizable", function () {
    var testUtils = vBootstrap.test.utils;
    var events = vBootstrap.config.events;

    var mouseupBus;
    var mouseoutBus;
    var mousemoveBus;
    var mousedownBus;
    var onDispose;
    var eventBuses;
    var isResizingProp;
    var elemVBData;
    var elem;
    var resizeFn;
    var isOverFn;
    var config;

    beforeEach(initBeforeEach);
    afterEach(initAfterEach);

    function initBeforeEach() {
        onDispose = undefined;
        mouseupBus = vBootstrap.config.streams.mock.setGlobalPushable('mouseup');
        mouseoutBus = new Bacon.Bus();
        mousemoveBus = new Bacon.Bus();
        mousedownBus = new Bacon.Bus();
        eventBuses = {};
        eventBuses[events.mouseout] = mouseoutBus;
        eventBuses[events.mousemove] = mousemoveBus;
        eventBuses[events.mousedown] = mousedownBus;
        //isResizingProp = Bacon.constant(true);
        elemVBData = {
            //isResizing: isResizingProp,
            onDispose: setOnDispose
        };
        spyOn(vBootstrap.utils, 'getVBData').and.returnValue(elemVBData);
        elem = $(testUtils.getDomElement());
        resizeFn = jasmine.createSpy('resizeFn');
        isOverFn = jasmine.createSpy('isOverFn');
        config = {
            elem: elem,
            resize: resizeFn,
            isOver: isOverFn,
            resizableClass: 'resizableClass',
            resizingClass: 'resizingClass'
        };
        elem.asEventStream = function (event) {
            return eventBuses[event];
        }
    }

    function initAfterEach() {
        if (onDispose) {
            for (var i = 0; i < onDispose.length; i++)
                onDispose[i]();
        }
    }

    it("should set isResizing on vBData", function () {
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.resize.resizable.init(lockService, config);

        expect(elemVBData.isResizing).not.toBe(undefined);
        expect(vBootstrap.utils.setVBData).toHaveBeenCalledWith(elem, elemVBData);
    });

    it("should lock on resizing", function () {
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.resize.resizable.init(lockService, config);

        expect(elemVBData.isResizing).not.toBe(undefined);
        expect(lockService.lockOn).toHaveBeenCalledWith(elemVBData.isResizing);
    });

    it("should set unsub function on dispose", function () {
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.resize.resizable.init(lockService, config);

        expect(onDispose.length).toBe(7);
    });

    it("should set isResizing TRUE when mouse down on over and NOT locked", function () {
        fail('too late');
    });

    it("should NOT set isResizing TRUE when mouse down on over and IS locked", function () {
        fail('too late');
    });

    it("should NOT set isResizing TRUE when NO mouse down and NOT locked", function () {
        fail('too late');
    });

    it("should NOT set isResizing TRUE when mouse down NOT over and NOT locked", function () {
        fail('too late');
    });

    it("should set isResizing FALSE when mouse up", function () {
        fail('too late');
    });

    it("should set resizable class when is over and NOT locked", function () {
        fail('too late');
    });

    it("should NOT set resizable class when is NOT over and NOT locked", function () {
        fail('too late');
    });

    it("should NOT set resizable class when is over and IS locked", function () {
        fail('too late');
    });

    it("should remove resizable class when mouse out", function () {
        fail('too late');
    });

    it("should add resizing class when mouse down over and NOT locked", function () {
        fail('too late');
    });

    it("should NOT add resizing class when mouse down NOT over and NOT locked", function () {
        fail('too late');
    });

    it("should NOT add resizing class when mouse down over and IS locked", function () {
        fail('too late');
    });

    it("should remove resizing class when mouse up", function () {
        fail('too late');
    });

    it("should add resizing class to BODY when mouse down over and NOT locked", function () {
        fail('too late');
    });

    it("should NOT add resizing class to BODY when mouse down over and IS locked", function () {
        fail('too late');
    });

    it("should remove resizing class from BODY when mouse up", function () {
        fail('too late');
    });

    it("should resize on mouse move", function () {
        fail('too late');
    });

    function setOnDispose(value) {
        onDispose = value;
    }
});