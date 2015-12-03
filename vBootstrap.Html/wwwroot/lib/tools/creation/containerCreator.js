﻿(function () {
    "use strict";

    var creatorConfig = {
        buttonText: '+ container',
        elementFn: vBootstrap.bootstrap.container
    };
    var vContainerCreator = vBootstrap.tools.creation.elementCreator
        .create(creatorConfig);

    namespace('vBootstrap.buttonCreators').containerCreator = vContainerCreator;
})();