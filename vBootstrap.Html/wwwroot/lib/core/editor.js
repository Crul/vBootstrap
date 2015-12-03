(function () {
    "use strict";
    namespace('vBootstrap.core').editor = vBEditor;

    function vBEditor(elem) {
        var jElem = $(elem);
        jElem.data('vBootstrapEditor', this);
        jElem.find('*').each(createElem);
        console.log('init');

        var toolbar = new vBootstrap.core.toolbar(jElem);
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