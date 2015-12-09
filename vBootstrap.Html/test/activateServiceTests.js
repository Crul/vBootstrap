/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="mock/lockServiceMock.js" />
/// <reference path="../wwwroot/src/config/activate.js" />
/// <reference path="../wwwroot/src/core/lock/locker.js" />
/// <reference path="../wwwroot/src/core/activate/activateService.js" />

describe("activate service", function () {
    var testUtils = vBootstrap.test.utils;

    var activatable;
    var activatableBus;
    var editor;
    var childestElem;
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        activatableBus = new Bacon.Bus();
        vBootstrap.CustomStreamArray = function () { return { bus: activatableBus }; };
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 1);
        editor = testUtils.getEditor();
        childestElem = testUtils.getDomElement();
        activatable = { element: { jElem: childestElem } };

        vBootstrap.utils.resetCssClass = jasmine.createSpy('resetCssClass');
        vBootstrap.utils.getChildest = jasmine
            .createSpy('getChildest')
            .and.returnValue(activatable);
    }

    it("should activate when NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        editor.mock.setDependencies(lockService);

        var activateService = new vBootstrap.core.activate.ActivateService(editor);
        activatableBus.push({});

        expectActivatedToBe(true);
    });

    it("should have active elem when NOT locked", function () {
        var activeElement;
        function setActive(element) { activeElement = element; }
        var lockService = testUtils.lock.getNotLockedService();
        editor.mock.setDependencies(lockService);

        var activateService = new vBootstrap.core.activate.ActivateService(editor);
        activatableBus.push({});
        activateService.activeElement.onValue(setActive);
        
        expect(activeElement).toBe(activatable.element);
    });

    it("should NOT activate when NO events", function () {
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 0);
        var lockService = testUtils.lock.getNotLockedService();
        editor.mock.setDependencies(lockService);

        var activateService = new vBootstrap.core.activate.ActivateService(editor);

        expectActivatedToBe(false);
    });

    it("should NOT activate when IS locked", function () {
        var lockService = testUtils.lock.getLockedService();
        editor.mock.setDependencies(lockService);

        var activateService = new vBootstrap.core.activate.ActivateService(editor);
        activatableBus.push({});

        expectActivatedToBe(false);
    });
    
    it("should STOP activate when editor bus ends", function () {
        var lockService = testUtils.lock.getNotLockedService();
        editor.mock.setDependencies(lockService);

        var activateService = new vBootstrap.core.activate.ActivateService(editor);
        var disposeFn = editor.bus.onEnd.calls.allArgs()[0][0];
        disposeFn();
        activatableBus.push({});

        expectActivatedToBe(false);
    });

    function expectActivatedToBe(value) {
        testUtils.expect.matchCssClass(childestElem, 'activated').toBe(value);
    }
});