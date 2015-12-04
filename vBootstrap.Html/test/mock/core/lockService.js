(function () {
    "use strict";
    var lockService = {
        lockOn: jasmine.createSpy('lockOn'),
        mock: {
            setIsLocked: setIsLocked
        }
    };
    setIsLocked(false);
    namespace('vBootstrap.core.lock').lockService = lockService;

    function setIsLocked(isLocked) {
        var isLockedProp = Bacon.constant(isLocked);
        lockService.isLocked = isLockedProp;
        lockService.isNotLocked = isLockedProp.not();
    }

})();