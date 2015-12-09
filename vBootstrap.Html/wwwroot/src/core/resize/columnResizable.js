(function () {
    "use strict";
    var resizeConfig = vBootstrap.config.resize;

    var subscribedToScreenSize;
    var screenSize;
    function setScreenSize(size) {
        screenSize = size;
    }

    namespace('vBootstrap.core.resize').columnResizable = {
        init: initColumnResizable
    };

    function initColumnResizable(element) {
        setColSizes(element);
        var dependencies = {
            screenSizeService: namespace('vBootstrap.core.resize.ScreenSizeService')
        };
        element.editor.resolve(dependencies, load, element);
    }

    function setColSizes(element) {
        var cssClass = element.jElem.attr('class');
        element.sizes = {
            xs: getColSize(cssClass, 'xs'),
            sm: getColSize(cssClass, 'sm'),
            md: getColSize(cssClass, 'md'),
            lg: getColSize(cssClass, 'lg')
        };
    }

    function getColSize(cssClass, size) {
        var regex = new RegExp('col-' + size + '-(\\d{1,2})', 'i');
        var matches = cssClass.match(regex) || [0, 0];
        return parseInt(matches[1]);
    }

    function load(screenSizeService) {
        if (!subscribedToScreenSize)
            subscribedToScreenSize = screenSizeService.screenSize.onValue(setScreenSize);

        var element = this;
        var jElem = this.jElem;
        var resizableConfig = {
            element: element,
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

            resizeColumn(element, cols);
        }

        vBootstrap.core.resize.resizable.init(resizableConfig);
    }

    function resizeColumn(element, cols) {
        var currentSize = element.sizes[screenSize];
        if (currentSize != cols) {
            var jElem = element.jElem;
            jElem.removeClass('col-' + screenSize + '-' + currentSize);
            jElem.addClass('col-' + screenSize + '-' + cols);
            element.sizes[screenSize] = cols;
        }
    }
})();