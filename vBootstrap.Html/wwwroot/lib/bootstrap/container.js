(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').container = vBContainer;

    function vBContainer(elem) {
        this.elem = elem;

        vBootstrap.core.lock.lockable.init(elem);
        vBootstrap.core.resize.verticalResizable.init(elem);
        vBootstrap.core.dragDrop.dropable.init(elem);
    }
})();