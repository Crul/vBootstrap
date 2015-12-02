(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').row = vbRow;

    function vbRow(elem) {
        this.elem = elem;

        vBootstrap.core.lock.lockable.init(elem);
        vBootstrap.core.resize.verticalResizable.init(elem);
        vBootstrap.core.dragDrop.dragable.init(elem);
        vBootstrap.core.dragDrop.dropable.init(elem);
    }
})();