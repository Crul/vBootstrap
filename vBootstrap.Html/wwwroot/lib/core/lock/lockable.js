(function () {
    "use strict";
    var lockService = vBootstrap.core.lock.lockService;

    namespace('vBootstrap.core.lock').lockable = {
        init: initLockable
    };

    function initLockable(elem) {
        lockService.isLocked.assign($(elem), 'toggleClass', 'locked');
    }
})();