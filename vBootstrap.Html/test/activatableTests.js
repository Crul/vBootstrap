/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/lib/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="mock/core/lockService.js" />
/// <reference path="../wwwroot/lib/config/activate.js" />
/// <reference path="../wwwroot/lib/core/activate/activatable.js" />

describe("activatable", function () {
    var testUtils = vBootstrap.test.utils;

    var obj;
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        vBootstrap.config.streams.mock.setGlobalMousemove();
        obj = testUtils.getObject();
    }
        
    it("should activatable when NOT locked and IS over elem", function () {
        vBootstrap.utils.mock.setIsCursorOverElem(true);
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.activate.activatable.init(lockService, obj);

        expectActivatableToBe(true);
    });

    it("should NOT activatable when no events", function () {
        vBootstrap.config.streams.mock.setGlobalMousemove(0);
        vBootstrap.utils.mock.setIsCursorOverElem(true);
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.activate.activatable.init(lockService, obj);

        expectActivatableToBe(false);
    });

    it("should NOT activatable when IS locked and IS over elem", function () {
        vBootstrap.utils.mock.setIsCursorOverElem(true);
        var lockService = testUtils.lock.getLockedService();

        vBootstrap.core.activate.activatable.init(lockService, obj);

        expectActivatableToBe(false);
    });

    it("should NOT activatable when NOT locked and NOT over elem", function () {
        vBootstrap.utils.mock.setIsCursorOverElem(false);
        var lockService = testUtils.lock.getNotLockedService();

        vBootstrap.core.activate.activatable.init(lockService, obj);

        expectActivatableToBe(false);
    });

    it("should NOT activatable when IS locked and NOT over elem", function () {
        vBootstrap.utils.mock.setIsCursorOverElem(false);
        var lockService = testUtils.lock.getLockedService();

        vBootstrap.core.activate.activatable.init(lockService, obj);

        expectActivatableToBe(false);
    });

    function expectActivatableToBe(value) {
        testUtils.expect.matchCssClass(obj.elem, 'activatable').toBe(value);
    }

});