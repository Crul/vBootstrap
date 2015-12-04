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

    var editor;
    var childestElem;
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 1);
        editor = { elem: testUtils.getDomElement() };
        childestElem = testUtils.getDomElement();
        $(document.body).append(editor.elem);
        $(editor.elem).append(childestElem);
        vBootstrap.utils.mock.setChildestElement(childestElem);
    }

    it("should activate when NOT locked", function () {
        var lockService = testUtils.lock.getNotLockedService();

        var activateService = new vBootstrap.core.activate.activateService(editor, lockService);

        expectActivatedToBe(true);
    });

    it("should NOT activate when NO events", function () {
        vBootstrap.config.streams.mock.setGlobalByCount('mousemove', 0);
        var lockService = testUtils.lock.getNotLockedService();

        var activateService = new vBootstrap.core.activate.activateService(editor, lockService);

        expectActivatedToBe(false);
    });

    it("should NOT activate when IS locked", function () {
        var lockService = testUtils.lock.getLockedService();

        var activateService = new vBootstrap.core.activate.activateService(editor, lockService);

        expectActivatedToBe(false);
    });

    function expectActivatedToBe(value) {
        testUtils.expect.matchCssClass(childestElem, 'activated').toBe(value);
    }
});