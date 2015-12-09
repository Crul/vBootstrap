(function () {
    "use strict";
    var events = vBootstrap.config.events;

    Element.prototype.removeOnDispose = removeOnDispose;
    Element.prototype.onDispose = onDispose;
    Element.prototype.dispose = dispose;

    namespace('vBootstrap.core').Element = Element;

    function Element(editor, jElem) {
        this.editor = editor;
        this.jElem = jElem;

        this.elemStreams = {};
        this.elemStreams.mouseout = jElem.asEventStream(events.mouseout);
        this.elemStreams.mousemove = jElem.asEventStream(events.mousemove);
        this.elemStreams.mousedown = jElem.asEventStream(events.mousedown);
    }
    
    function onDispose(fn) {
        this.unsubsFn = this.unsubsFn || [];
        if (!Array.isArray(fn)) fn = [fn];
        this.unsubsFn = this.unsubsFn.concat(fn);
    }

    function removeOnDispose(fn) {
        this.unsubsFn = this.unsubsFn || [];
        var index = this.unsubsFn.indexOf(fn);
        if (index > -1) {
            this.unsubsFn.splice(index, 1);
        } else {
            console.warn('Element.removeOnDispose: fn not found');
        }
    }

    function dispose() {
        var jElem = this.jElem;
        $(this.unsubsFn).each(unsub);
        jElem.stop().fadeOut(500, removeElem);

        function removeElem() {
            jElem.remove();
        }
    }

    function unsub(i, unsubFn) {
        unsubFn();
    }
})();