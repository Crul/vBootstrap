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
        },
        sizeMinLimits: {
            xs: 0,
            sm: 768,
            md: 992,
            lg: 1200
        },
        sizeStyles: {
            xs: 767,
            sm: 880,
            md: 1096,
            lg: 1200
        }
    };
})(window);