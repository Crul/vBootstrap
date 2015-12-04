(function () {
    "use strict";
    var buttonsCssClass = 'vb-toolbar-buttons';
    var buttonsSelector = '.' + buttonsCssClass;
    var toolbarTemplate = `
        <div class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class ="navbar-brand" href="/">
                        vBootstrap<br/>
                        <h6 style="margin: 0; text-align: right;"><small>demo</small></h6>
                    </a>
                </div>
                <div class ="${buttonsCssClass}"></div>
            </div>
        </div>
        `;

    namespace('vBootstrap.core').toolbar = vBToolbar;

    var buttonFactories = [];
    vBToolbar.addButtonFactory = addButtonFactory;

    function addButtonFactory(buttonFactory) {
        buttonFactories.push(buttonFactory);
    }

    function vBToolbar(editorElem) {
        var toolbar = createToolbar(editorElem);
        $(buttonFactories).each(createButton);

        function createButton(i, buttonFactory) {
            var button = buttonFactory.create();
            toolbar.find(buttonsSelector).append(button);
        }
    }

    function createToolbar(editorElem) {
        var toolbar = $(toolbarTemplate);
        editorElem.prepend(toolbar);
        return toolbar;
    }
})();