(function () {
    "use strict";

    var isLocked = Bacon.constant(false);
    var isLockedBus = new Bacon.Bus();
    var isLockedPublic = isLockedBus.toProperty(false);

    var unsubscribeBus;
    subscribeBus();

    var lockService = {
        isLocked: isLockedPublic,
        isNotLocked: isLockedPublic.not(),
        lockOn: lockOn
    };

    namespace('vBootstrap.core.lock').lockService = lockService;

    function lockOn(prop) {
        isLocked = isLocked.or(prop);
        unsubscribeBus();
        subscribeBus();
    }

    function subscribeBus() {
        unsubscribeBus = isLocked.onValue(function (v) {
            isLockedBus.push(v);
        });
    }
})();