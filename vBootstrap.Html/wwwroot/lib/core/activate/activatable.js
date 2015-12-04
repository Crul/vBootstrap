(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var activateConfig = vBootstrap.config.activate;
    var globalStreams = vBootstrap.config.streams.global;
    var lockService = vBootstrap.core.lock.lockService;
    var activateService = vBootstrap.core.activate.activateService;

    namespace('vBootstrap.core.activate').activatable = {
        init: initActivatable
    };

    function initActivatable(obj) {
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