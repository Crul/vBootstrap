/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="mock/lockServiceMock.js" />
/// <reference path="../wwwroot/src/config/activate.js" />
/// <reference path="../wwwroot/src/core/activate/activatable.js" />

describe("activatable", function () {
    var testUtils = vBootstrap.test.utils;

    var element;
    var activatableStream;
    var activatableStreamOutput;
    var removeActivatableFn;
    var activateService;
    var foo = {};

    beforeEach(initBeforeEach);

    function initBeforeEach() {
        activatableStream = activatableStreamOutput = removeActivatableFn = undefined;

        vBootstrap.utils.getElementAndEventIfIsOverFn = jasmine
            .createSpy('getElementAndEventIfIsOverFn')
            .and.returnValue(function () {
                return foo;
            });

        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 1);
        element = testUtils.getBootstrapElement();
        element.onDispose = setRemoveActivatable;
        activateService = {
            activatables: {
                add: function (stream) {
                    activatableStream = stream;
                    activatableStream.onValue(function (value) {
                        activatableStreamOutput = value;
                    })
                },
                remove: jasmine.createSpy('removeActivatable')
            }
        };
    }

    it("should add stream to activateService when NOT locked and IS over elem", function () {
        var lockService = testUtils.lock.getNotLockedService();
        element.editor.mock.setDependencies(lockService, activateService);

        vBootstrap.core.activate.activatable.init(element);

        expect(activatableStream).not.toBe(undefined);
        expect(activatableStreamOutput).toBe(foo);
    });

    it("should remove activatable stream on element dispose", function () {
        var lockService = testUtils.lock.getNotLockedService();
        element.editor.mock.setDependencies(lockService, activateService);

        vBootstrap.core.activate.activatable.init(element);

        expect(removeActivatableFn).not.toBe(undefined);
        expect(activateService.activatables.remove).not.toHaveBeenCalled();
        removeActivatableFn();
        expect(activateService.activatables.remove).toHaveBeenCalled();
    });

    it("should NOT activatable when no events", function () {
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 0);
        var lockService = testUtils.lock.getNotLockedService();
        element.editor.mock.setDependencies(lockService, activateService);

        vBootstrap.core.activate.activatable.init(element);

        expect(activatableStream).not.toBe(undefined);
        expect(activatableStreamOutput).toBe(undefined);
    });

    it("should NOT activatable when IS locked and IS over elem", function () {
        var lockService = testUtils.lock.getLockedService();
        element.editor.mock.setDependencies(lockService, activateService);

        vBootstrap.core.activate.activatable.init(element);

        expect(activatableStream).not.toBe(undefined);
        expect(activatableStreamOutput).toBe(undefined);
    });

    it("should NOT activatable when NOT locked and NOT over elem", function () {
        vBootstrap.utils.getElementAndEventIfIsOverFn = jasmine
            .createSpy('getElementAndEventIfIsOverFn');

        var lockService = testUtils.lock.getNotLockedService();
        element.editor.mock.setDependencies(lockService, activateService);

        vBootstrap.core.activate.activatable.init(element);

        expect(activatableStream).not.toBe(undefined);
        expect(activatableStreamOutput).toBe(undefined);
    });

    it("should NOT activatable when IS locked and NOT over elem", function () {
        var lockService = testUtils.lock.getLockedService();
        vBootstrap.utils.getElementAndEventIfIsOverFn = jasmine
            .createSpy('getElementAndEventIfIsOverFn');
        element.editor.mock.setDependencies(lockService, activateService);

        vBootstrap.core.activate.activatable.init(element);

        expect(activatableStream).not.toBe(undefined);
        expect(activatableStreamOutput).toBe(undefined);
    });

    function setRemoveActivatable(removeActivatable) {
        removeActivatableFn = removeActivatable;
    }

    function expectActivatableToBe(value) {
        testUtils.expect.matchCssClass(element.elem, 'activatable').toBe(value);
    }

});