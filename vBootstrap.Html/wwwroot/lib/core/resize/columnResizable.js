(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;
    var events = vBootstrap.config.events;

    namespace('vBootstrap.core.resize').columnResizable = {
        init: initColumnResizable
    };

    function initColumnResizable(e, column) {
        var elem = $(e);
        var parent = elem.parent();
        var resizableConfig = {
            elem: elem,
            resize: resizeFromRight,
            isOver: isRight,
            resizableClass: resizeConfig.cssClasses.resizableColumn,
            resizingClass: resizeConfig.cssClasses.resizingColumn
        };

        var cssClass = e.className;
        column.sizes = {
            xs: getColSize(cssClass, 'xs'),
            sm: getColSize(cssClass, 'sm'),
            md: getColSize(cssClass, 'md'),
            lg: getColSize(cssClass, 'lg')
        };

        function isRight(ev) {
            ev.preventDefault();
            return elem[0].offsetWidth - ev.offsetX < resizeConfig.threshold;
        }

        function resizeFromRight(ev) {
            var parentWidth = parent.width();
            var colWidth = parentWidth / 12;
            var relativeLeft = ev.clientX - elem.position().left;
            var cols = Math.round((relativeLeft / colWidth) || 1);

            // TODO sizes
            if (column.sizes.xs != cols) {
                elem.removeClass('col-xs-' + column.sizes.xs);
                elem.addClass('col-xs-' + cols);
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