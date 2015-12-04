/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="mock/core/lockService.js" />
/// <reference path="../wwwroot/src/config/activate.js" />
/// <reference path="../wwwroot/src/core/lock/locker.js" />
/// <reference path="../wwwroot/src/core/activate/activateService.js" />

describe("activate service", function () {
    var testUtils = vBootstrap.test.utils;

    var childest;
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        vBootstrap.config.streams.mock.setGlobalMousemove();
        childest = testUtils.getObject();
        vBootstrap.utils.mock.setChildestElement(childest.elem);
    }

    it("should activate when NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();

        var activateService = new vBootstrap.core.activate.activateService(lockService);

        expectActivatedToBe(true);
    });

    it("should NOT activate when NO events", function () {
        vBootstrap.config.streams.mock.setGlobalMousemove(0);
        var lockService = testUtils.lock.getNotLockedService();

        var activateService = new vBootstrap.core.activate.activateService(lockService);

        expectActivatedToBe(false);
    });

    it("should NOT activate when IS locked", function () {
        var lockService = testUtils.lock.getLockedService();

        var activateService = new vBootstrap.core.activate.activateService(lockService);

        expectActivatedToBe(false);
    });

    function expectActivatedToBe(value) {
        testUtils.expect.matchCssClass(childest.elem, 'activated').toBe(value);
    }
});