(function (global) {
    "use strict";
    var doc = $(document);
    var win = $(window);
    var events = vBootstrap.config.events;
    namespace('vBootstrap.config').streams = {
        global: {
            resize: win.asEventStream(events.resize),
            mouseup: doc.asEventStream(events.mouseup),
            mousemove: doc.asEventStream(events.mousemove)
        }
    };
})(window);