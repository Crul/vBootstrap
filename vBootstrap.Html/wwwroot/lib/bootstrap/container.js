(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').container = vBContainer;
    vBContainer.template = $('<div />').addClass('container');

    function vBContainer(elem) {
        this.elem = elem || vBContainer.template.clone()[0];
        vBootstrap.core.bootstrapElement.call(this);

        vBootstrap.core.lock.lockable.init(this);
        vBootstrap.core.activate.activatable.init(this);
        vBootstrap.core.resize.verticalResizable.init(this);
        vBootstrap.core.dragDrop.selfDraggable.init(this);
        vBootstrap.core.dragDrop.dropable.init(this);
        vBootstrap.tools.inform.informable.init(this, 'container');
    }

    vBContainer.prototype = $.extend(vBContainer.prototype, vBootstrap.core.bootstrapElement.prototype);
})();