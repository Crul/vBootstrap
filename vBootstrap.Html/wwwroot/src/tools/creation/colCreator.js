(function () {
    "use strict";

    var creatorConfig = {
        buttonText: '+ col',
        elementFn: vBootstrap.bootstrap.col
    };

    function vBColCreator(editor) {
        return vBootstrap.tools.creation.elementCreator.create(editor, creatorConfig);
    }

    namespace('vBootstrap.tools.creation').colCreator = vBColCreator;
})();