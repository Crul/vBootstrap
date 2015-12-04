(function () {
    "use strict";
    var screenSizeService = vBootstrap.core.resize.screenSizeService;
    namespace('vBootstrap.tools').screenSizeDisplay = new vBScreenSizeDisplay();

    function vBScreenSizeDisplay() {
        var toolbarTemplate = `
            <div class ="navbar-text text-center">
                <span class ="label label-primary">
                    screen size: <span class="screen-size-text"></span>
                </span>
            </div>
        `;

        var buttonFactory = {
            create: function () {
                var button = $(toolbarTemplate);

                screenSizeService.screenSize.onValue(onScreenSizeChange);

                function onScreenSizeChange(screenSize) {
                    var editor = $(vBootstrap.config.selectors.editor);
                    button.find('.screen-size-text').html(screenSize);
                }

                return button;
            }
        };

        vBootstrap.core.toolbar.addButtonFactory(buttonFactory);
    }
})();