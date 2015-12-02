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

    function vBToolbar(editorElem) {
        var toolbar = createToolbar(editorElem);
        var toolbarButtons = Object.keys(namespace('vBootstrap.buttonCreators'));
        $(toolbarButtons).each(createButton);

        function createButton(i, buttonCreator) {
            createToolbarButton(toolbar, buttonCreator);
        }
    }

    function createToolbar(editorElem) {
        var toolbar = $(toolbarTemplate);
        editorElem.prepend(toolbar);
        return toolbar;
    }

    function createToolbarButton(toolbar, buttonCreator) {
        var button = namespace('vBootstrap.buttonCreators')[buttonCreator].create();
        toolbar.find(buttonsSelector).append(button);
    }
})();