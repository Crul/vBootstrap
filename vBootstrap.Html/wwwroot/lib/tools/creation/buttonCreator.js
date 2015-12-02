(function () {
    "use strict";

    var creatorConfig = {
        buttonText: 'new<br/>button',
        elementFn: vBootstrap.bootstrap.button
    };
    var vBButtonCreator = vBootstrap.tools.creation.elementCreator
        .create(creatorConfig);

    namespace('vBootstrap.buttonCreators').buttonCreator = vBButtonCreator;
})();