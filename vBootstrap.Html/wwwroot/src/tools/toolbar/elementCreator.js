(function () {
    "use strict";

    function ElementCreator() { }
    namespace('vBootstrap.tools.toolbar').ElementCreator = ElementCreator;

    ElementCreator.prototype.create = createCreatorButton;
    ElementCreator.prototype.setGetShadowTemplateFn = setGetShadowTemplateFn;

    function createCreatorButton(config) {
        this.editor = config.editor;
        this.setGetShadowTemplateFn(config);
        this.toolbarTemplate = `
            <div class ="navbar-text text-center">
                ${config.buttonText}
            </div>
        `;

        var dependencies = {
            toolbar: namespace('vBootstrap.core.Toolbar'),
            lockService: namespace('vBootstrap.core.lock.Locker'),
            dragDropService: namespace('vBootstrap.core.dragDrop.DragDropService')
        };
        this.editor.resolve(dependencies, load, this);
    }

    function setGetShadowTemplateFn(config) {
        this.getShadowTemplate = getShadowTemplate;
        function getShadowTemplate() {
            return new config.factory(config.editor).create();
        }
    }

    function load(toolbar, lockService, dragDropService) {
        var button = $(this.toolbarTemplate);
        var draggableConfig = {
            element: { jElem: button, editor: this.editor },
            getShadowTemplate: this.getShadowTemplate
        };
        vBootstrap.core.dragDrop.draggable.init(draggableConfig);

        toolbar.addButton(button);
    }

})();