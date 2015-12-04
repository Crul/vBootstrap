(function (global) {
    "use strict";

    namespace('vBootstrap.config').streams = {
        global: {
            //resize: Bacon.fromBinder(getBinderFn('resize')),
            mouseup: Bacon.fromBinder(getBinderFn('mouseup')),
            mousemove: Bacon.fromBinder(getBinderFn('mousemove'))
        },
        mock: {
            setGlobalByCount: setGlobalByCount,
            setGlobalPushable: setGlobalPushable,
            pushableBuses: {}
        }
    };

    function setGlobalPushable(eventName) {
        var bus = new Bacon.Bus();
        var event = Bacon.fromBinder(onBusValue);

        vBootstrap.config.streams.global[eventName] = event;
        vBootstrap.config.streams.mock.pushableBuses[eventName] = bus;
        return bus;

        function onBusValue(sink) {
            bus.onValue(sink);
            return function () { };
        }
    }

    function setGlobalByCount(eventName, eventNumber) {
        var event = Bacon.fromBinder(getBinderFn(eventName, eventNumber));
        vBootstrap.config.streams.global[eventName] = event;
    }

    function getBinderFn(eventName, eventNumber) {
        return function (sink) {
            if (eventNumber)
                for (var i = 0; i < eventNumber; i++)
                    sink(new $.Event(eventName));

            return function () { };
        };
    }

})(window);