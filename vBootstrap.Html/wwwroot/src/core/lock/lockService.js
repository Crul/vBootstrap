(function () {
    "use strict";
    var Locker = new vBootstrap.core.lock.Locker();
    namespace('vBootstrap.core.lock').LockService = Locker;
    vBootstrap.addFactory(vBootstrap.core.lock.Locker);
})();