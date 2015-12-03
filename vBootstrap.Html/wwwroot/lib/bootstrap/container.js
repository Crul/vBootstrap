(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').container = vBContainer;
    vBContainer.template = $('<div />').addClass('container');

    function vBContainer(elem) {
        this.elem = elem || vBContainer.template.clone()[0];

        vBootstrap.core.lock.lockable.init(this.elem);
        vBootstrap.core.activate.activatable.init(this.elem);
        vBootstrap.core.resize.verticalResizable.init(this.elem);
        vBootstrap.core.dragDrop.dropable.init(this.elem);
        vBootstrap.core.dragDrop.selfDraggable.init(this.elem);
    }
})();