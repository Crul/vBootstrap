(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').col = vBCol;
    vBCol.selector = vBootstrap.config.selectors.bootstrap.col;

    function vBCol(elem) {
        this.elem = elem;

        vBootstrap.core.lock.lockable.init(elem);
        vBootstrap.core.resize.columnResizable.init(elem, this);
        vBootstrap.core.resize.verticalResizable.init(elem);
        vBootstrap.core.dragDrop.selfDraggable.init(elem);
        vBootstrap.core.dragDrop.dropable.init(elem);
    }

})();