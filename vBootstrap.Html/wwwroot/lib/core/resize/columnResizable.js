(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;

    namespace('vBootstrap.core.resize').columnResizable = {
        init: initColumnResizable
    };

    function initColumnResizable(obj) {
        var jElem = $(obj.elem);
        var resizableConfig = {
            elem: jElem,
            resize: resizeFromRight,
            isOver: isRight,
            resizableClass: resizeConfig.cssClasses.resizableColumn,
            resizingClass: resizeConfig.cssClasses.resizingColumn
        };

        function isRight(ev) {
            ev.preventDefault();
            return jElem.outerWidth() - ev.offsetX < resizeConfig.threshold;
        }

        function resizeFromRight(ev) {
            var parentWidth = jElem.parent().width();
            var colWidth = parentWidth / 12;
            var relativeLeft = ev.pageX - jElem.offset().left;
            var cols = Math.round((relativeLeft / colWidth) || 1);

            // TODO sizes
            if (obj.sizes.xs != cols) {
                jElem.removeClass('col-xs-' + obj.sizes.xs);
                jElem.addClass('col-xs-' + cols);
                obj.sizes.xs = cols;
            }
        }

        vBootstrap.core.resize.resizable.init(resizableConfig);
    }

})();