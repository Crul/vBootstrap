(function () {
    "use strict";

    $.extend(ContainerFactory.prototype, vBootstrap.core.ElementFactory.prototype);
    ContainerFactory.prototype.config = {
        selector: vBootstrap.config.selectors.bootstrap.container,
        template: $('<div />').addClass('container'),
        features: [
            namespace('vBootstrap.core.resize.verticalResizable'),
            namespace('vBootstrap.core.dragDrop.selfDraggable'),
            namespace('vBootstrap.core.dragDrop.droppable')
        ]
    };

    namespace('vBootstrap.bootstrap').ContainerFactory = ContainerFactory;
    vBootstrap.addFactory(ContainerFactory);

    function ContainerFactory(editor) {
        vBootstrap.core.ElementFactory.call(this, editor);
    }
})();