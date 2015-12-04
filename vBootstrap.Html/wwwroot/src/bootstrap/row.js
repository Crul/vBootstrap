(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').row = vBRow;
    vBRow.template = $('<div />').addClass('row');

    function vBRow(editor, elem) {
        this.elem = elem || vBRow.template.clone()[0];
        vBootstrap.core.bootstrapElement.call(this);

        vBootstrap.core.lock.lockable.init(editor.lockService, this);
        vBootstrap.core.activate.activatable.init(editor.lockService, this);
        vBootstrap.core.resize.verticalResizable.init(editor, this);
        vBootstrap.core.dragDrop.selfDraggable.init(editor, this);
        vBootstrap.core.dragDrop.dropable.init(editor, this);
        vBootstrap.tools.inform.informable.init(this, 'row');
    }

    vBRow.prototype = $.extend(vBRow.prototype, vBootstrap.core.bootstrapElement.prototype);
})();