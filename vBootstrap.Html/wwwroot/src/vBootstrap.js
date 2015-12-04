(function (global) {
    "use strict";
    var vBootstrap = namespace('vBootstrap');

    vBootstrap.edit = editVBootstrap;

    function editVBootstrap() {
        $(vBootstrap.config.selectors.editor).each(createEditor);
    }

    function createEditor(i, elem) {
        new vBootstrap.core.editor(elem);
    }

})(window);