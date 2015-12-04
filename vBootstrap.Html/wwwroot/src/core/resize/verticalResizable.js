(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;

    namespace('vBootstrap.core.resize').verticalResizable = {
        init: initVerticalResizable
    };

    function initVerticalResizable(editor, obj) {
        var jElem = $(obj.elem);
        var resizableConfig = {
            elem: jElem,
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
            jElem = $(obj.elem);
            var height = ev.pageY - jElem.offset().top;
            jElem.css(resizeConfig.verticalCssProperty, height);
        }

        vBootstrap.core.resize.resizable.init(editor.lockService, resizableConfig);
    }


})();