/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/lockServiceMock.js" />
/// <reference path="../wwwroot/src/core/lock/lockable.js" />

describe("lockable", function () {
    var testUtils = vBootstrap.test.utils;

    var element;
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        element = testUtils.getBootstrapElement();
    }

    it("should NOT lock when NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();
        element.editor.mock.setDependencies(lockService);

        vBootstrap.core.lock.lockable.init(element);

        expectLockedToBe(false);
    });

    it("should lock when IS locked", function () {
        var lockService = testUtils.lock.getLockedService();
        element.editor.mock.setDependencies(lockService);

        vBootstrap.core.lock.lockable.init(element);

        expectLockedToBe(true);
    });

    it("should call on dispose", function () {
        var lockService = testUtils.lock.getLockedService();
        element.editor.mock.setDependencies(lockService);

        vBootstrap.core.lock.lockable.init(element);

        expect(element.onDispose).toHaveBeenCalledWith(jasmine.any(Function));
    });

    function expectLockedToBe(value) {
        testUtils.expect.matchCssClass(element.jElem, 'locked').toBe(value);
    }

});