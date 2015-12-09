(function () {
    "use strict";
    $.extend(ContainerCreator.prototype, vBootstrap.tools.toolbar.ElementCreator.prototype)
    namespace('vBootstrap.tools.toolbar').ContainerCreator = ContainerCreator;
    vBootstrap.addFactory(ContainerCreator);

    function ContainerCreator(editor) {
        var creatorConfig = {
            editor: editor,
            buttonText: '+ container',
            factory: vBootstrap.bootstrap.ContainerFactory
        };
        this.create(creatorConfig);
    }
})();