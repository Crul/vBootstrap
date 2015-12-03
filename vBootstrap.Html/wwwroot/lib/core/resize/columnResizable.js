(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;

    namespace('vBootstrap.core.resize').columnResizable = {
        init: initColumnResizable
    };

    function initColumnResizable(elem, column) {
        var jElem = $(elem);
        var resizableConfig = {
            elem: jElem,
            resize: resizeFromRight,
            isOver: isRight,
            resizableClass: resizeConfig.cssClasses.resizableColumn,
            resizingClass: resizeConfig.cssClasses.resizingColumn
        };

        var cssClass = jElem.attr('class');
        column.sizes = {
            xs: getColSize(cssClass, 'xs'),
            sm: getColSize(cssClass, 'sm'),
            md: getColSize(cssClass, 'md'),
            lg: getColSize(cssClass, 'lg')
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
            if (column.sizes.xs != cols) {
                jElem.removeClass('col-xs-' + column.sizes.xs);
                jElem.addClass('col-xs-' + cols);
                column.sizes.xs = cols;
            }
        }

        vBootstrap.core.resize.resizable.init(resizableConfig);
    }

    function getColSize(cssClass, size) {
        var regex = new RegExp('col-' + size + '-(\\d{1,2})', 'i');
        var matches = cssClass.match(regex) || [0, 0];
        return parseInt(matches[1]);
    }
})();