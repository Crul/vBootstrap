(function () {
    "use strict";

    namespace('vBootstrap.core.lock').locker = vBLocker;

    function vBLocker() {

        var isLockedBus = new Bacon.Bus();
        var isLockedPublic = isLockedBus.toProperty(false);
        var isNotLockedPublic = isLockedPublic.not();

        var isLocked;
        var locks = [];
        var unsubscribeBus;

        subscribeBus();

        var lockService = {
            isLocked: isLockedPublic,
            isNotLocked: isNotLockedPublic,
            lockOn: lockOn,
            removeLockOn: removeLockOn
        };

        function lockOn(lock) {
            locks.push(lock);
            unsubscribeBus();
            subscribeBus();
        }

        function removeLockOn(lock) {
            var index = locks.indexOf(lock);
            if (index > -1) {
                locks.splice(index, 1);
                unsubscribeBus();
                subscribeBus();
            }
        }

        function subscribeBus() {
            isLocked = Bacon.constant(false);
            $(locks).each(setLock);
            unsubscribeBus = isLocked.onValue(function (v) {
                isLockedBus.push(v);
            });
        }

        function setLock(i, lock) {
            isLocked = isLocked.or(lock);
        }
        return lockService;
    }

})();