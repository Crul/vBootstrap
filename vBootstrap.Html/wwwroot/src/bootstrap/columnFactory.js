(function () {
    "use strict";

    $.extend(ColumnFactory.prototype, vBootstrap.core.ElementFactory.prototype);
    ColumnFactory.prototype.config = {
        selector: vBootstrap.config.selectors.bootstrap.column,
        template: $('<div />').addClass('col-xs-4'),
        features: [
            namespace('vBootstrap.core.resize.verticalResizable'),
            namespace('vBootstrap.core.resize.columnResizable'),
            namespace('vBootstrap.core.dragDrop.selfDraggable'),
            namespace('vBootstrap.core.dragDrop.droppable')
        ]
    };

    namespace('vBootstrap.bootstrap').ColumnFactory = ColumnFactory;
    vBootstrap.addFactory(ColumnFactory);

    function ColumnFactory(editor) {
        vBootstrap.core.ElementFactory.call(this, editor);
    }
    /*
    vBCol.prototype.getInfo = getInfo;
    function getInfo() {
        var dis = this;
        return Object.keys(dis.sizes).map(getColClass).join('');

        function getColClass(size) {
            if (dis.sizes[size])
                return ' col-' + size + '-' + dis.sizes[size];
            else
                return;
        }
    }
    */
})();