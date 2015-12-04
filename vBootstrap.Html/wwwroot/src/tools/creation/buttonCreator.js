(function () {
    "use strict";

    var creatorConfig = {
        buttonText: '+ button',
        elementFn: vBootstrap.bootstrap.button
    };

    function vBButtonCreator(editor) {
        return vBootstrap.tools.creation.elementCreator.create(editor, creatorConfig);
    }

    namespace('vBootstrap.tools.creation').buttonCreator = vBButtonCreator;
})();