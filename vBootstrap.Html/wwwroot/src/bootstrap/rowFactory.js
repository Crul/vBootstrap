(function () {
    "use strict";

    $.extend(RowFactory.prototype, vBootstrap.core.ElementFactory.prototype);
    RowFactory.prototype.config = {
        selector: vBootstrap.config.selectors.bootstrap.row,
        template: $('<div />').addClass('row'),
        features: [
            namespace('vBootstrap.core.resize.verticalResizable'),
            namespace('vBootstrap.core.dragDrop.selfDraggable'),
            namespace('vBootstrap.core.dragDrop.droppable')
        ]
    };

    namespace('vBootstrap.bootstrap').RowFactory = RowFactory;
    vBootstrap.addFactory(RowFactory);

    function RowFactory(editor) {
        vBootstrap.core.ElementFactory.call(this, editor);
    }
})();