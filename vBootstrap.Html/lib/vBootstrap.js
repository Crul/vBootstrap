(function (global) {
    "use strict";
    var vBootstrap = namespace('vBootstrap');
    var editorFactory = new vBootstrap.core.editorFactory();

    vBootstrap.edit = editVBootstrap;

    function editVBootstrap() {
        var editors = $(vBootstrap.config.cssClasses.editor);
        var editorArray = editors.toArray().concat([new Bacon.End()]);
        var editorStream = Bacon.fromArray();

        editorStream.onValue(editorFactory.create);
    }

})(window);