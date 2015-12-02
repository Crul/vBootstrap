(function () {
    "use strict";

    var isLockedBus = new Bacon.Bus();
    var isLocked = isLockedBus.toProperty(false);
    var isNotLocked = isLocked.not();

    function lockOn(prop) {
        isLockedBus.plug(prop);
    }

    var lockService = {
        isLocked: isLocked,
        isNotLocked: isNotLocked,
        lockOn: lockOn
    };

    namespace('vBootstrap.core.lock').lockService = lockService;

})();