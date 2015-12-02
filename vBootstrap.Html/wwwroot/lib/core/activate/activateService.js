(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var activateCss = vBootstrap.config.activate.cssClasses;

    var locker = new vBootstrap.core.lock.locker();

    var childestActivatable = globalStreams.mousemove
        .filter(locker.isNotLocked)
        .map(getChildestActive)
        .toProperty();

    childestActivatable.skipDuplicates().onValue(function (e) {
        vBUtils.resetCssClass(activateCss.active);
        $(e).addClass(activateCss.active);
    });
    
    var activateService = {
        activeElement: childestActivatable,
        isLocked: locker.isLockedPublic,
        isNotLocked: locker.isNotLocked,
        lockOn: locker.lockOn,
        removeLockOn: locker.removeLockOn
    };

    namespace('vBootstrap.core.activate').activateService = activateService;

    function getChildestActive() {
        return vBUtils.getChildest(activateCss.activatable);
    }
})();