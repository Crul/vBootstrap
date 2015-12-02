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

    function initActivatable(elem) {
        globalStreams.mousemove
            .filter(lockService.isNotLocked)
            .filter(activateService.isNotLocked)
            .map(isOver)
            .toProperty(false)
            .assign($(elem), 'toggleClass', activateConfig.cssClasses.activatable);

        function isOver(ev) {
            var jElem = $(elem);
            var offset = jElem.offset();
            var elemProperties = { 
                left: offset.left, 
                top: offset.top, 
                width: jElem.width() + 2 * activateConfig.padding,
                height: jElem.height() + 2 * activateConfig.padding
            };
            return vBUtils.isCursorOverElem(ev, elemProperties);
        }
    }
})();