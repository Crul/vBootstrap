(function () {
    "use strict";

    var creatorConfig = {
        buttonText: '+ container',
        elementFn: vBootstrap.bootstrap.container
    };

    function vContainerCreator(editor) {
        return vBootstrap.tools.creation.elementCreator.create(editor, creatorConfig);
    }

    namespace('vBootstrap.tools.creation').containerCreator = vContainerCreator;
})();