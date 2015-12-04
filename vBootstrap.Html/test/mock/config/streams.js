(function (global) {
    "use strict";

    namespace('vBootstrap.config').streams = {
        global: {
            //resize: Bacon.fromBinder(getBinderFn('resize')),
            //mouseup: Bacon.fromBinder(getBinderFn('mouseup')),
            mousemove: Bacon.fromBinder(getBinderFn('mousemove'))
        },
        mock: {
            setGlobalMousemove: setGlobalMousemove
        }
    };

    function setGlobalMousemove(eventNumber) {
        setGlobal('mousemove', eventNumber);
    }

    function setGlobal(eventName, eventNumber) {
        var event = Bacon.fromBinder(getBinderFn(eventName, eventNumber));
        vBootstrap.config.streams.global[eventName] = event;
    }

    function getBinderFn(eventName, eventNumber) {
        if (eventNumber === undefined)
            eventNumber = 1;

        return function (sink) {
            for (var i = 0; i < eventNumber; i++)
                sink(new $.Event(eventName));

            return function () { };
        };
    }

})(window);