(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    namespace('vBootstrap.core').disposable = vBDisposable;

    function vBDisposable(elem) {
        this.elem = elem;
        vBUtils.setVBData(elem, {
            elem: elem,
            dispose: this.dispose,
            onDispose: this.onDispose
        });
    }

    vBDisposable.prototype.onDispose = onDispose;
    vBDisposable.prototype.dispose = dispose;

    function onDispose(fn) {
        this.unsubsFn = this.unsubsFn || [];
        if (!Array.isArray(fn))
            fn = [fn];

        this.unsubsFn = this.unsubsFn.concat(fn);
    }

    function dispose() {
        $(this.unsubsFn).each(unsub);
        var jElem = $(this.elem);
        jElem.stop()
            .fadeOut(500, function () {
                jElem.remove();
            });
    }

    function unsub(i, unsubFn) {
        unsubFn();
    }
})();