/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/config/events.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
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
        isResizingProp = Bacon.constant(true);
        elemVBData = { isResizing: isResizingProp, onDispose: setOnDispose };
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

    it("should foo", function (done) {
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.resize.resizable.init(lockService, config);

        expect(lockService.lockOn).toHaveBeenCalled();
        expect(onDispose).not.toBe(undefined);
        expect(vBootstrap.utils.setVBData.calls.count()).toBe(1);
        // WTF! expect(vBootstrap.utils.setVBData.calls.allArgs()).toEqual([elemVBData]);
        // WTF! expect(vBootstrap.utils.setVBData).toHaveBeenCalledWith(elemVBData);

        done();
    });

    function setOnDispose(value) {
        onDispose = value;
    }
});