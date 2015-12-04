(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;

    namespace('vBootstrap.core.resize').verticalResizable = {
        init: initVerticalResizable
    };

    function initVerticalResizable(obj) {
        var elem = obj.elem;
        var resizableConfig = {
            elem: elem,
            resize: resizeFromBottom,
            isOver: isBottom,
            resizableClass: resizeConfig.cssClasses.resizableBottom,
            resizingClass: resizeConfig.cssClasses.resizingBottom
        };

        function isBottom(ev) {
            ev.preventDefault();
            return $(elem).outerHeight() - ev.offsetY < resizeConfig.threshold;
        }

        function resizeFromBottom(ev) {
            var jElem = $(elem);
            var height = ev.pageY - jElem.offset().top;
            jElem.css(resizeConfig.verticalCssProperty, height);
        }

        vBootstrap.core.resize.resizable.init(resizableConfig);
    }


})();