(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    namespace('vBootstrap.core').bootstrapElement = vBBootstrapElement;

    function vBBootstrapElement(elem) {
        vBUtils.setVBData(this.elem, {
            dispose: this.dispose,
            onDispose: this.onDispose
        });
    }

    vBBootstrapElement.prototype.onDispose = onDispose;
    vBBootstrapElement.prototype.dispose = dispose;

    function onDispose(fn) {
        this.unsubsFn = this.unsubsFn || [];
        if (!Array.isArray(fn)) fn = [fn];
        this.unsubsFn = this.unsubsFn.concat(fn);
    }

    function dispose() {
        $(this.unsubsFn).each(unsub);
        var jElem = $(this.elem);
        jElem.stop().fadeOut(500, removeElem);

        function removeElem() {
            jElem.remove();
        }
    }

    function unsub(i, unsubFn) {
        unsubFn();
    }
})();