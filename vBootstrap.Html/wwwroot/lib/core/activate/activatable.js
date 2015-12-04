(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var activateConfig = vBootstrap.config.activate;
    var globalStreams = vBootstrap.config.streams.global;

    namespace('vBootstrap.core.activate').activatable = {
        init: initActivatable
    };

    function initActivatable(lockService, obj) {
        var elem = obj.elem;
        var jElem = $(elem);

        var unsubFn = globalStreams.mousemove
            .filter(lockService.isNotLocked)
            .map(isOver)
            .toProperty(false)
            .assign($(elem), 'toggleClass', activateConfig.cssClasses.activatable);

        vBUtils.getVBData(elem).onDispose(unsubFn);

        function isOver(ev) {
            return vBUtils.isCursorOverElem(ev, jElem);
        }
    }
})();