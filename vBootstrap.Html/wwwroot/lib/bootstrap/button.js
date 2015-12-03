(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').button = vBButton;
    vBButton.selector = vBootstrap.config.selectors.bootstrap.button;
    vBButton.template = $('<div />').addClass('btn btn-default').html('Accept');

    function vBButton(elem) {
        this.elem = elem || vBButton.template.clone()[0];
        vBootstrap.core.bootstrapElement.call(this);

        vBootstrap.core.lock.lockable.init(this);
        vBootstrap.core.activate.activatable.init(this);
        vBootstrap.core.dragDrop.selfDraggable.init(this);
        vBootstrap.tools.inform.informable.init(this, 'button');
    }

    vBButton.prototype = $.extend(vBButton.prototype, vBootstrap.core.bootstrapElement.prototype);
})();