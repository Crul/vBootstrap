(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').row = vBRow;
    vBRow.template = $('<div />').addClass('row');

    function vBRow(elem) {
        this.elem = elem || vBRow.template.clone()[0];
        vBootstrap.core.disposable.call(this, this.elem);

        vBootstrap.core.lock.lockable.init(this.elem);
        vBootstrap.core.activate.activatable.init(this.elem);
        vBootstrap.core.resize.verticalResizable.init(this.elem);
        vBootstrap.core.dragDrop.selfDraggable.init(this.elem);
        vBootstrap.core.dragDrop.dropable.init(this.elem);
    }

    vBRow.prototype = $.extend(vBRow.prototype, vBootstrap.core.disposable.prototype);
})();