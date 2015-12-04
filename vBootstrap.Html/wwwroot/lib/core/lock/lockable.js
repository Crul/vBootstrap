(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;

    var unsubscribe;
    namespace('vBootstrap.core.lock').lockable = {
        init: initLockable
    };

    function initLockable(lockService, obj) {
        var unsubFn = lockService.isLocked.assign($(obj.elem), 'toggleClass', 'locked');
        vBUtils.getVBData(obj.elem).onDispose(unsubFn);
    }
})();