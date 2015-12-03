(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var lockService = vBootstrap.core.lock.lockService;

    var unsubscribe;
    namespace('vBootstrap.core.lock').lockable = {
        init: initLockable
    };

    function initLockable(elem) {
        var unsubFn = lockService.isLocked.assign($(elem), 'toggleClass', 'locked');
        vBUtils.getVBData(elem).onDispose(unsubFn);
    }
})();