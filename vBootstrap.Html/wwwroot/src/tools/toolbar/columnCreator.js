(function () {
    "use strict";
    $.extend(ColumnCreator.prototype, vBootstrap.tools.toolbar.ElementCreator.prototype)
    namespace('vBootstrap.tools.toolbar').ColumnCreator = ColumnCreator;
    vBootstrap.addFactory(ColumnCreator);

    function ColumnCreator(editor) {
        var creatorConfig = {
            editor: editor,
            buttonText: '+ col',
            factory: vBootstrap.bootstrap.ColumnFactory
        };
        this.create(creatorConfig);
    }
})();