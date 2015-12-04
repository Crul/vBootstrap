(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var activateCss = vBootstrap.config.activate.cssClasses;

    namespace('vBootstrap.core.activate').activateService = vBActivateService;

    function vBActivateService(editor, lockService) {
        var locker = new vBootstrap.core.lock.locker();
        lockService.lockOn(locker.isLocked);

        var childestActivatable = globalStreams.mousemove
            .debounceImmediate(50)
            .filter(lockService.isNotLocked)
            .map(getChildestActive)
            .skipDuplicates()
            .toProperty();

        var dispose = childestActivatable.onValue(setActivated);
        
        function setActivated(elem) {
            vBUtils.resetCssClass(activateCss.active);
            $(elem).addClass(activateCss.active);
        }

        function getChildestActive() {
            return vBUtils.getChildest(editor.elem, activateCss.activatable);
        }

        return {
            dispose: dispose,
            activeElement: childestActivatable,
            isLocked: locker.isLocked,
            isNotLocked: locker.isNotLocked,
            lockOn: locker.lockOn,
            removeLockOn: locker.removeLockOn
        };
    }
})();