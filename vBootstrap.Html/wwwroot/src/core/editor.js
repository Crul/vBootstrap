(function () {
    "use strict";
    namespace('vBootstrap.core').editor = vBEditor;

    function vBEditor(elem) {
        var editor = this;
        editor.elem = elem;

        createCoreServices(editor);
        createToolbar(editor, elem);
        createTools(editor);
        createElements(editor, elem);
        console.log('init');
    }

    function createCoreServices(editor) {
        editor.lockService = vBootstrap.core.lock.lockService;
        editor.activateService = new vBootstrap.core.activate.activateService(editor, editor.lockService);
        editor.dragDropService = new vBootstrap.core.dragDrop.dragDropService(editor, editor.lockService);
    }

    function createToolbar(editor, elem) {
        editor.toolbar = new vBootstrap.core.toolbar(elem);
        editor.toolbar.addButton(new vBootstrap.tools.creation.containerCreator(editor));
        editor.toolbar.addButton(new vBootstrap.tools.creation.rowCreator(editor));
        editor.toolbar.addButton(new vBootstrap.tools.creation.colCreator(editor));
        editor.toolbar.addButton(new vBootstrap.tools.creation.buttonCreator(editor));
    }

    function createTools(editor) {
        var removator = new vBootstrap.tools.removator(editor.activateService);
        var editator = new vBootstrap.tools.edit.editator(editor.activateService);
        var informator = new vBootstrap.tools.inform.informator(editor.activateService);
    }

    function createElements(editor, elem) {
        $(elem).find('*').each(createElem);

        function createElem(i, elem) {
            var bootstrapElements = Object.keys(vBootstrap.bootstrap);
            $(bootstrapElements).each(createBootstrapElem);

            function createBootstrapElem(i, elemName) {
                var bootsrapElement = namespace('vBootstrap.bootstrap.' + elemName);
                if ($(elem).is(bootsrapElement.selector || '.' + elemName)) {
                    new bootsrapElement(editor, elem);
                }
            }
        }
    }
})();