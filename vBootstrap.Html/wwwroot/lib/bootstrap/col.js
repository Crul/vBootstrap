(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').col = vbCol;

    function vbCol(elem) {
        this.elem = elem;

        vBootstrap.core.lock.lockable.init(elem);
        vBootstrap.core.resize.columnResizable.init(elem, this);
        vBootstrap.core.resize.verticalResizable.init(elem);
        vBootstrap.core.dragDrop.dragable.init(elem);
        vBootstrap.core.dragDrop.dropable.init(elem);
    }

})();