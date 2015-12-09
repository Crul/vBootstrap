(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;

    namespace('vBootstrap.core.resize').verticalResizable = {
        init: initVerticalResizable
    };

    function initVerticalResizable(element) {
        var jElem = element.jElem;
        var resizableConfig = {
            element: element,
            resize: resizeFromBottom,
            isOver: isBottom,
            resizableClass: resizeConfig.cssClasses.resizableBottom,
            resizingClass: resizeConfig.cssClasses.resizingBottom
        };

        function isBottom(ev) {
            ev.preventDefault();
            return jElem.outerHeight() - ev.offsetY < resizeConfig.threshold;
        }

        function resizeFromBottom(ev) {
            var height = ev.pageY - jElem.offset().top;
            jElem.css(resizeConfig.verticalCssProperty, height);
        }

        vBootstrap.core.resize.resizable.init(resizableConfig);
    }

})();