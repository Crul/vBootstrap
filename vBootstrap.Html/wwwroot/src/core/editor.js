(function () {
    "use strict";
    namespace('vBootstrap.core').editor = vBEditor;

    function vBEditor(elem) {
        var editor = this;

        var jElem = $(elem);
        var toolbar = new vBootstrap.core.toolbar(jElem);

        editor.lockService = vBootstrap.core.lock.lockService;
        editor.activateService = new vBootstrap.core.activate.activateService(editor.lockService);

        var removator = new vBootstrap.tools.removator(editor.activateService);
        var editator = new vBootstrap.tools.edit.editator(editor.activateService);
        var informator = new vBootstrap.tools.inform.informator(editor.activateService);

        jElem.find('*').each(createElem);

        console.log('init');

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