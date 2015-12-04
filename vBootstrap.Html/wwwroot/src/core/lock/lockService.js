(function () {
    "use strict";
    var locker = new vBootstrap.core.lock.locker();
    namespace('vBootstrap.core.lock').lockService = locker;
})();