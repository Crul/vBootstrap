(function () {
    "use strict";

    var vBElementCreator = {
        create: createCreatorButton
    };

    namespace('vBootstrap.tools.creation').elementCreator = vBElementCreator;

    function createCreatorButton(config) {
        var elementFn = config.elementFn;
        var buttonText = config.buttonText;
        var toolbarTemplate = `
            <div class ="navbar-text text-center">
                ${buttonText}
            </div>
        `;

        function getShadowTemplate() {
            return new elementFn().elem;
        }

        return {
            create: function () {
                var button = $(toolbarTemplate);
                var draggableConfig = {
                    element: button,
                    getShadowTemplate: getShadowTemplate
                };
                vBootstrap.core.dragDrop.draggable.init(draggableConfig);
                return button;
            }
        };
    }

})();