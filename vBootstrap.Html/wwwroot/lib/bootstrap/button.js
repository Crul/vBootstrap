(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').button = vBButton;
    vBButton.selector = vBootstrap.config.selectors.bootstrap.button;
    vBButton.template = $('<button />').attr('type', 'button').addClass('btn btn-success').html('Accept');

    function vBButton(editor, elem) {
        this.elem = elem || vBButton.template.clone()[0];
        vBootstrap.core.bootstrapElement.call(this);

        vBootstrap.core.lock.lockable.init(editor.lockService, this);
        vBootstrap.core.activate.activatable.init(editor.lockService, this);
        vBootstrap.core.dragDrop.selfDraggable.init(this);
        vBootstrap.tools.inform.informable.init(this, 'button');
    }

    vBButton.prototype = $.extend(vBButton.prototype, vBootstrap.core.bootstrapElement.prototype);
})();