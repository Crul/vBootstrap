(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;
    var sizes = Object.keys(resizeConfig.sizeMinLimits);
    var globalStreams = vBootstrap.config.streams.global;


    var resizeStream = globalStreams.resize
        .merge(Bacon.once())
        .map(getBootstrapSize)
        .skipDuplicates();

    namespace('vBootstrap.core.resize').screenSizeService = {
        sizes: sizes,
        screenSize: resizeStream
    };

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