(function (global) {
    "use strict";
    var doc = $(document);
    var events = vBootstrap.config.events;
    namespace('vBootstrap.config').streams = {
        global: {
            mouseup: doc.asEventStream(events.mouseup),
            mousemove: doc.asEventStream(events.mousemove)
        }
    };
})(window);