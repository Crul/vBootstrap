(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var activateCss = vBootstrap.config.activate.cssClasses;
    var lockService = vBootstrap.core.lock.lockService;

    var locker = new vBootstrap.core.lock.locker();
    lockService.lockOn(locker.isLocked);

    var childestActivatable = globalStreams.mousemove
        .filter(lockService.isNotLocked)
        .map(getChildestActive)
        .skipDuplicates()
        .toProperty();

    childestActivatable.onValue(function (elem) {
        vBUtils.resetCssClass(activateCss.active);
        $(elem).addClass(activateCss.active);
    });
    
    var activateService = {
        activeElement: childestActivatable,
        isLocked: locker.isLocked,
        isNotLocked: locker.isNotLocked,
        lockOn: locker.lockOn,
        removeLockOn: locker.removeLockOn
    };

    namespace('vBootstrap.core.activate').activateService = activateService;

    function getChildestActive() {
        return vBUtils.getChildest(activateCss.activatable);
    }
})();