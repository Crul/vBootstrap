(function () {
    "use strict";

    $.extend(ButtonFactory.prototype, vBootstrap.core.ElementFactory.prototype);
    ButtonFactory.prototype.config = {
        selector: vBootstrap.config.selectors.bootstrap.button,
        template: $('<button />').attr('type', 'button').addClass('btn btn-success').html('Accept'),
        features: [
            namespace('vBootstrap.core.dragDrop.selfDraggable')
        ]
    };
    
    namespace('vBootstrap.bootstrap').ButtonFactory = ButtonFactory;
    vBootstrap.addFactory(ButtonFactory);

    function ButtonFactory(editor) {
        vBootstrap.core.ElementFactory.call(this, editor);
    }
})();