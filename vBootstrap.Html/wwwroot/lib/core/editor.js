(function () {
    "use strict";
    namespace('vBootstrap.core').editor = vbEditor;

    function vbEditor(elem) {
        var editorElem = $(elem);
        editorElem.data('vBootstrapEditor', this);
        editorElem.find('*').each(createElem);
    }

    function createElem(i, elem) {
        var bootstrapSelectors = vBootstrap.config.selectors.bootstrap;
        var bootstrapElements = Object.keys(bootstrapSelectors);
        $(bootstrapElements).each(createBootstrapElem);

        function createBootstrapElem(i, elemName) {
            if ($(elem).is(bootstrapSelectors[elemName])) {
                var bootsrapElement = namespace('vBootstrap.bootstrap.' + elemName);
                new bootsrapElement(elem);
            }
        }
    }
})();