(function () {
    "use strict";
    namespace('vBootstrap.core').editorFactory = vbEditorFactory;
    function vbEditorFactory() {

    }

    vbEditorFactory.prototype.create = createEditor;
    function createEditor(elem) {
        return new vBootstrap.core.editor(elem);
    }
})();