(function (global) {
    "use strict";
    namespace('vBootstrap.config').resize = {
        threshold: 6,
        padding: 8,
        verticalCssProperty: 'min-height',
        cssClasses: {
            resizableBottom: 'resizable-bottom',
            resizingBottom: 'resizing-bottom',
            resizableColumn: 'resizable-right',
            resizingColumn: 'resizing-right'
        }
    };
})(window);