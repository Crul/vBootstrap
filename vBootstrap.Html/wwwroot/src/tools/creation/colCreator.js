(function () {
    "use strict";

    var creatorConfig = {
        buttonText: '+ col',
        elementFn: vBootstrap.bootstrap.col
    };
    var vBColCreator = vBootstrap.tools.creation.elementCreator
        .create(creatorConfig);

    namespace('vBootstrap.buttonCreators').colCreator = vBColCreator;
})();