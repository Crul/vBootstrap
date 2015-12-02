(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var activateCss = vBootstrap.config.activate.cssClasses;

    var isLockedBus = new Bacon.Bus();
    var isLockedPublic = isLockedBus.toProperty(false);
    var isNotLockedPublic = isLockedPublic.not();

    var isLocked;
    var locks = [];
    var unsubscribeBus;

    subscribeBus();

    var childestActivatable = globalStreams.mousemove
        .filter(isNotLockedPublic)
        .map(getChildestActive)
        .toProperty();

    childestActivatable.skipDuplicates().onValue(function (e) {
        vBUtils.resetCssClass(activateCss.active);
        $(e).addClass(activateCss.active);
    });
    
    var activateService = {
        activeElement: childestActivatable,
        isLocked: isLockedPublic,
        isNotLocked: isNotLockedPublic,
        lockOn: lockOn,
        removeLockOn: removeLockOn
    };

    namespace('vBootstrap.core.activate').activateService = activateService;

    function getChildestActive() {
        return vBUtils.getChildest(activateCss.activatable);
    }

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
})();