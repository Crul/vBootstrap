(function () {
    "use strict";

    var screenSize;
    vBootstrap.core.resize.screenSizeService.screenSize.onValue(setScreenSize);
    function setScreenSize(size) {
        screenSize = size;
    }

    namespace('vBootstrap.core.resize').columnResizeService = {
        resize: resizeColumn
    };

    function resizeColumn(obj, cols) {
        var currentSize = obj.sizes[screenSize];
        if (currentSize != cols) {
            var jElem = $(obj.elem);
            jElem.removeClass('col-' + screenSize + '-' + currentSize);
            jElem.addClass('col-' + screenSize + '-' + cols);
            obj.sizes[screenSize] = cols;
        }
    }
})();