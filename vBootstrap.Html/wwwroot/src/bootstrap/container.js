(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').container = vBContainer;
    vBContainer.template = $('<div />').addClass('container');

    function vBContainer(editor, elem) {
        this.elem = elem || vBContainer.template.clone()[0];
        vBootstrap.core.bootstrapElement.call(this);

        vBootstrap.core.lock.lockable.init(editor.lockService, this);
        vBootstrap.core.activate.activatable.init(editor.lockService, this);
        vBootstrap.core.resize.verticalResizable.init(editor, this);
        vBootstrap.core.dragDrop.selfDraggable.init(editor, this);
        vBootstrap.core.dragDrop.dropable.init(editor, this);
        vBootstrap.tools.inform.informable.init(this, 'container');
    }

    vBContainer.prototype = $.extend(vBContainer.prototype, vBootstrap.core.bootstrapElement.prototype);
})();