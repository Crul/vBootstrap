(function () {
    "use strict";

    var creatorConfig = {
        buttonText: 'new<br/>row',
        elementFn: vBootstrap.bootstrap.row
    };
    var vBRowCreator = vBootstrap.tools.creation.elementCreator
        .create(creatorConfig);

    namespace('vBootstrap.buttonCreators').rowCreator = vBRowCreator;
})();