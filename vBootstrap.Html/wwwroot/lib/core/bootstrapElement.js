(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    namespace('vBootstrap.core').bootstrapElement = vBBootstrapElement;

    function vBBootstrapElement(elem) {
        vBUtils.setVBData(this.elem, {
            dispose: this.dispose,
            onDispose: this.onDispose,
            removeOnDispose: this.removeOnDispose
        });
    }

    vBBootstrapElement.prototype.removeOnDispose = removeOnDispose;
    vBBootstrapElement.prototype.onDispose = onDispose;
    vBBootstrapElement.prototype.dispose = dispose;

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
            console.warn('onDisponse not found');
        }
    }

    function dispose(elem) {
        $(this.unsubsFn).each(unsub);
        var jElem = $(elem);
        jElem.stop().fadeOut(500, removeElem);

        function removeElem() {
            jElem.remove();
        }
    }

    function unsub(i, unsubFn) {
        unsubFn();
    }
})();