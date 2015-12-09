(function (global) {
    "use strict";
    var vBootstrap = namespace('vBootstrap');

    var editorBus = new Bacon.Bus();
    vBootstrap.edit = editElement;
    vBootstrap.addFactory = addFactory;
    vBootstrap.editorStream = editorBus;
    vBootstrap.remove = editorBus.end;

    function editElement(elem) {
        if (!elem)
            elem = $(vBootstrap.config.selectors.editor);
        else
            elem = $(elem);

        if (!elem)
            elem = $(document.body);

        elem.each(createEditor);
    }

    function createEditor(i, elem) {
        var editor = new vBootstrap.core.Editor(elem);
        editorBus.push(editor);
        editor.loadElements();
    }

    function addFactory(ComponentFn) {
        vBootstrap.editorStream.onValue(componentFactory);

        function componentFactory(editor) {
            editor.bus.push(new ComponentFn(editor));
        }
    }

})(window);