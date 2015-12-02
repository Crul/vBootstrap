(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var globalStreams = vBootstrap.config.streams.global;
    var activateCss = vBootstrap.config.activate.cssClasses;

    var childestActivatable = globalStreams.mousemove
        .map(getChildestActive)
        .toProperty();

    childestActivatable.skipDuplicates().onValue(function (e) {
        vBUtils.resetCssClass(activateCss.active);
        $(e).addClass(activateCss.active);
    });

    var activateService = {
        activeElement: childestActivatable
    };

    namespace('vBootstrap.core.dragDrop').activateService = activateService;

    function getChildestActive() {
        return vBUtils.getChildest(activateCss.activatable);
    }

})();