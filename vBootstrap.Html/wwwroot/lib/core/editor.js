(function () {
    "use strict";
    namespace('vBootstrap.core').editor = vBEditor;

    function vBEditor(elem) {
        var editorElem = $(elem);
        editorElem.data('vBootstrapEditor', this);
        editorElem.find('*').each(createElem);

        var toolbar = new vBootstrap.core.toolbar(editorElem);
    }

    function createElem(i, elem) {
        var bootstrapElements = Object.keys(vBootstrap.bootstrap);
        $(bootstrapElements).each(createBootstrapElem);

        function createBootstrapElem(i, elemName) {
            var bootsrapElement = namespace('vBootstrap.bootstrap.' + elemName);
            if ($(elem).is(bootsrapElement.selector || '.' + elemName)) {
                new bootsrapElement(elem);
            }
        }
    }
})();