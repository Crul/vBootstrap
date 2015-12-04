(function () {
    "use strict";
    namespace('vBootstrap.test').utils = {
        getBootstrapElement: getBootstrapElement,
        getDomElement: getDomElement,
        lock: {
            getLockedService: getLockedService,
            getNotLockedService: getNotLockedService
        },
        expect: {
            matchCssClass: matchCssClass
        }
    };

    function getDomElement() {
        return $('<div />')[0];
    }

    function getBootstrapElement() {
        return { elem: getDomElement() };
    }

    function getLockedService() {
        return getLockService(true);
    }

    function getNotLockedService() {
        return getLockService(false);
    }

    function getLockService(locked) {
        vBootstrap.core.lock.lockService.mock.setIsLocked(locked);
        return vBootstrap.core.lock.lockService;
    }

    function matchCssClass(elem, cssClassName) {
        var cssClass = $(elem).attr('class') || '';
        var matches = !!cssClass.match(new RegExp(cssClassName));
        return expect(matches);
    }

})();