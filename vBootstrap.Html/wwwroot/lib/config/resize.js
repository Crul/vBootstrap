(function (global) {
    "use strict";
    namespace('vBootstrap.config').resize = {
        threshold: 12,
        verticalCssProperty: 'min-height',
        cssClasses: {
            resizableBottom: 'resizable-bottom',
            resizingBottom: 'resizing-bottom',
            resizableColumn: 'resizable-right',
            resizingColumn: 'resizing-right'
        }
    };
})(window);