(function () {
    "use strict";
    var vBootstrap = namespace('vBootstrap');
    var toolbarTemplate = `
            <div class ="navbar-text text-center">
                <span class ="label label-primary">
                    screen size: <span class="screen-size-text"></span>
                </span>
            </div>
        `;

    ScreenSizeDisplay.prototype.load = load;
    namespace('vBootstrap.tools.toolbar').ScreenSizeDisplay = ScreenSizeDisplay;
    vBootstrap.addFactory(ScreenSizeDisplay);

    function ScreenSizeDisplay(editor) {
        this.editor = editor;
        var dependencies = {
            toolbar: namespace('vBootstrap.core.Toolbar'),
            screenSizeService: namespace('vBootstrap.core.resize.ScreenSizeService')
        };
        editor.resolve(dependencies, load, this);
    }

    function load(toolbar, screenSizeService) {
        var button = $(toolbarTemplate);
        toolbar.addButton(button);

        screenSizeService.screenSize.onValue(onScreenSizeChange);

        function onScreenSizeChange(screenSize) {
            button.find('.screen-size-text').html(screenSize);
        }
    }


})();