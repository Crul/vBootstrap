(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').button = vBButton;
    vBButton.selector = vBootstrap.config.selectors.bootstrap.button;
    vBButton.template = $('<div />').addClass('btn btn-default').html('Accept');

    function vBButton(elem) {
        this.elem = elem || vBButton.template.clone()[0];

        vBootstrap.core.lock.lockable.init(this.elem);
        vBootstrap.core.dragDrop.selfDraggable.init(this.elem);
    }
})();