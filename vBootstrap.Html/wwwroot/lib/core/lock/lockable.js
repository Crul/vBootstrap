(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var lockService = vBootstrap.core.lock.lockService;

    var unsubscribe;
    namespace('vBootstrap.core.lock').lockable = {
        init: initLockable
    };

    function initLockable(obj) {
        var unsubFn = lockService.isLocked.assign($(obj.elem), 'toggleClass', 'locked');
        vBUtils.getVBData(obj.elem).onDispose(unsubFn);
    }
})();