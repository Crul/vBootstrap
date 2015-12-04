/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="mock/core/lockService.js" />
/// <reference path="../wwwroot/src/core/lock/lockable.js" />

describe("lockable", function () {
    var testUtils = vBootstrap.test.utils;

    var bootstrapElement;
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 1);
        bootstrapElement = testUtils.getBootstrapElement();
    }

    it("should NOT lock when NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.lock.lockable.init(lockService, bootstrapElement);

        expectLockedToBe(false);
    });

    it("should lock when IS locked", function () {
        var lockService = testUtils.lock.getLockedService();

        vBootstrap.core.lock.lockable.init(lockService, bootstrapElement);

        expectLockedToBe(true);
    });

    function expectLockedToBe(value) {
        testUtils.expect.matchCssClass(bootstrapElement.elem, 'locked').toBe(value);
    }

});