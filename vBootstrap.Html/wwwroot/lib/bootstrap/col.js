(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').col = vBCol;
    vBCol.selector = vBootstrap.config.selectors.bootstrap.col;
    vBCol.template = $('<div />').addClass('col-xs-4');

    function vBCol(elem) {
        this.elem = elem || vBCol.template.clone()[0];
        vBootstrap.core.disposable.call(this, this.elem);

        vBootstrap.core.lock.lockable.init(this.elem);
        vBootstrap.core.activate.activatable.init(this.elem);
        vBootstrap.core.resize.columnResizable.init(this.elem, this);
        vBootstrap.core.resize.verticalResizable.init(this.elem);
        vBootstrap.core.dragDrop.selfDraggable.init(this.elem);
        vBootstrap.core.dragDrop.dropable.init(this.elem);
    }

    vBCol.prototype = $.extend(vBCol.prototype, vBootstrap.core.disposable.prototype);
})();