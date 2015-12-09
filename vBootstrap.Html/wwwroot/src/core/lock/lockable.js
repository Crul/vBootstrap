(function () {
    "use strict";

    var unsubscribe;
    namespace('vBootstrap.core.lock').lockable = {
        init: initLockable
    };

    function initLockable(element) {
        var dependencies = { lockService: namespace('vBootstrap.core.lock.Locker') };
        element.editor.resolve(dependencies, load, element);
    }

    function load(lockService) {
        var dispose = lockService.isLocked.assign(this.jElem, 'toggleClass', 'locked');
        this.onDispose(dispose);
    }
})();