(function () {
    "use strict";
    $.extend(RowCreator.prototype, vBootstrap.tools.toolbar.ElementCreator.prototype)
    namespace('vBootstrap.tools.toolbar').RowCreator = RowCreator;
    vBootstrap.addFactory(RowCreator);

    function RowCreator(editor) {
        var creatorConfig = {
            editor: editor,
            buttonText: '+ row',
            factory: vBootstrap.bootstrap.RowFactory
        };
        this.create(creatorConfig);
    }
})();