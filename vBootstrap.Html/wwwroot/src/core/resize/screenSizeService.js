(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;
    var sizes = Object.keys(resizeConfig.sizeMinLimits);
    var globalStreams = vBootstrap.config.streams.global;

    var resizeStream = globalStreams.resize
        .map(getBootstrapSize)
        .skipDuplicates()
        .toProperty(getBootstrapSize());

    namespace('vBootstrap.core.resize').ScreenSizeService = ScreenSizeService;
    vBootstrap.addFactory(ScreenSizeService);

    function ScreenSizeService(editor) {
        this.screenSize = resizeStream;
        this.sizes = sizes
        editor.screenSizeService = this;
    }

    function getBootstrapSize() {
        var width = window.innerWidth;
        for (var i = 0; i < sizes.length - 1; i++) {
            var nextSize = sizes[i + 1];
            if (resizeConfig.sizeMinLimits[nextSize] >= width) {
                return sizes[i];
            }
        }
        return sizes[sizes.length - 1];
    }

})();