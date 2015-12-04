(function () {
    "use strict";

    var creatorConfig = {
        buttonText: '+ row',
        elementFn: vBootstrap.bootstrap.row
    };

    function vBRowCreator(editor) {
        return vBootstrap.tools.creation.elementCreator.create(editor, creatorConfig);
    }

    namespace('vBootstrap.tools.creation').rowCreator = vBRowCreator;
})();