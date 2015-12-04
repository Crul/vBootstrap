(function () {
    "use strict";

    var singlentonDragDropService;
    var baconBus = new Bacon.Bus();
    namespace('vBootstrap.core.dragDrop').dropTargetSelector = vBDropTargetSelector;

    function vBDropTargetSelector() {
        return singlentonDragDropService = singlentonDragDropService || {
            startBindingTarget: jasmine.createSpy('startBindingTarget'),
            stopBindingTarget: jasmine.createSpy('stopBindingTarget'),
            target: baconBus.toProperty(undefined),
            mock: {
                targetBus: baconBus
            }
        };
    }
})();