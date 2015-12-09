(function () {
    "use strict";
    var vBootstrap = namespace('vBootstrap');

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

    namespace('vBootstrap.core').Toolbar = Toolbar;
    vBootstrap.addFactory(Toolbar);

    Toolbar.prototype.addButton = addButton;

    function Toolbar(editor) {
        editor.toolbar = this;
        this.jElem = $(toolbarTemplate);
        $(editor.jElem).prepend(this.jElem);
    }

    function addButton(button) {
        this.jElem.find(buttonsSelector).prepend(button); // prepend because Bacon executes streams in reverse order (?)
    }

})();