(function () {
    "use strict";

    Locker.prototype.lockOn = lockOn;
    Locker.prototype.removeLockOn = removeLockOn;
    Locker.prototype.reset = reset;
    namespace('vBootstrap.core.lock').Locker = Locker;

    function Locker(editor) {
        if (editor) // TODO
            editor.lockService = this;

        this.isLockedBus = new Bacon.Bus();
        this.internalLocked;
        this.locks = [];
        this.isLocked = this.isLockedBus.toProperty(false);
        this.isNotLocked = this.isLocked.not();

        this.reset();
    }

    function lockOn(lock) {
        this.locks.push(lock);
        this.reset();
    }

    function removeLockOn(lock) {
        var index = this.locks.indexOf(lock);
        if (index > -1) {
            this.locks.splice(index, 1);
            this.reset();
        } else {
            console.warn('Locker.removeLockOn: lock not found: ' + lock.id);
        }
    }

    function reset() {
        var locker = this;

        if (this.unsubscribeBus)
            this.unsubscribeBus();

        this.internalLocked = Bacon.constant(false);
        $(this.locks).each(setLock);
        this.unsubscribeBus = this.internalLocked.onValue(pushPublicValue);

        function pushPublicValue(v) {
            locker.isLockedBus.push(v);
        }

        function setLock(i, lock) {
            locker.internalLocked = locker.internalLocked.or(lock.toProperty());
        }
    }

})();