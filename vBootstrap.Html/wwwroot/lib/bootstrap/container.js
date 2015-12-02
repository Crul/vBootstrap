(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').container = vbContainer;

    function vbContainer(elem) {
        this.elem = elem;

        vBootstrap.core.lock.lockable.init(elem);
        vBootstrap.core.resize.verticalResizable.init(elem);
        vBootstrap.core.dragDrop.dropable.init(elem);
    }
})();