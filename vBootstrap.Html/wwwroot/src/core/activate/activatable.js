(function () {
    "use strict";
    var vBUtils = namespace('vBootstrap.utils');
    var globalStreams = namespace('vBootstrap.config.streams.global');
    var activateConfig = namespace('vBootstrap.config.activate');

    namespace('vBootstrap.core.activate').activatable = {
        init: initActivatable
    };

    function initActivatable(element) {
        var dependencies = {
            lockService: namespace('vBootstrap.core.lock.Locker'),
            activateService: namespace('vBootstrap.core.activate.ActivateService')
        };
        element.editor.resolve(dependencies, load, element);
    }

    function load(lockService, activateService) {
        var element = this;
        var activatableStream = globalStreams.mousemove
            .filter(lockService.isNotLocked)
            .map(vBUtils.getElementAndEventIfIsOverFn(element));

        activateService.activatables.add(activatableStream);

        element.onDispose(removeActivatable);
        function removeActivatable() {
            activateService.activatables.remove(activatableStream);
        }
    }
})();