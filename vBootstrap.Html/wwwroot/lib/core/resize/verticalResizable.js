﻿(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;
    var events = vBootstrap.config.events;

    namespace('vBootstrap.core.resize').verticalResizable = {
        init: initVerticalResizable
    };

    function initVerticalResizable(elem) {
        var resizableConfig = {
            elem: elem,
            resize: resizeFromBottom,
            isOver: isBottom,
            resizableClass: resizeConfig.cssClasses.resizableBottom,
            resizingClass: resizeConfig.cssClasses.resizingBottom
        };

        function isBottom(ev) {
            ev.preventDefault();
            return elem.offsetHeight - ev.offsetY < resizeConfig.threshold;
        }

        function resizeFromBottom(ev) {
            var height = ev.pageY - $(elem).offset().top;
            $(elem).css(resizeConfig.verticalCssProperty, height);
        }

        vBootstrap.core.resize.resizable.init(resizableConfig);
    }


})();