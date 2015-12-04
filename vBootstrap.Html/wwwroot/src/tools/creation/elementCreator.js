(function () {
    "use strict";
    
    namespace('vBootstrap.tools.creation').elementCreator = {
        create: createCreatorButton
    };

    function createCreatorButton(editor, config) {
        var elementFn = config.elementFn;
        var buttonText = config.buttonText;
        var toolbarTemplate = `
            <div class ="navbar-text text-center">
                ${buttonText}
            </div>
        `;

        var buttonFactory = {
            create: function () {
                var button = $(toolbarTemplate);
                var draggableConfig = {
                    element: button,
                    getShadowTemplate: getShadowTemplate
                };
                vBootstrap.core.dragDrop.draggable.init(editor.dragDropService, editor.lockService, draggableConfig);
                return button;
            }
        };

        return buttonFactory;

        function getShadowTemplate() {
            return new elementFn(editor).elem;
        }
    }

})();