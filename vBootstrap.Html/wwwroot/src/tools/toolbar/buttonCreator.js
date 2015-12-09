(function () {
    "use strict";
    $.extend(ButtonCreator.prototype, vBootstrap.tools.toolbar.ElementCreator.prototype)
    namespace('vBootstrap.tools.toolbar').ButtonCreator = ButtonCreator;
    vBootstrap.addFactory(ButtonCreator);
    
    function ButtonCreator(editor) {
        var creatorConfig = {
            editor: editor,
            buttonText: '+ button',
            factory: vBootstrap.bootstrap.ButtonFactory
        };
        this.create(creatorConfig);
    }
})();