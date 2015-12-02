(function () {
    "use strict";
    var selectors = vBootstrap.config.selectors;
    var dragDropConfig = vBootstrap.config.dragDrop;

    namespace('vBootstrap.core.dragDrop').dragShadow = vBDragShadow;

    function vBDragShadow(elem) {
        var shadow = elem.clone();
        shadow.width(elem[0].offsetWidth);
        shadow.height(elem[0].offsetHeight);
        shadow.css(elem.offset());
        shadow.addClass(dragDropConfig.cssClasses.dragging);
        var shadowVBData = shadow.data(selectors.vBData) || {};
        shadowVBData.source = elem;
        shadow.data(selectors.vBData, shadowVBData);

        var elemVBData = elem.data(selectors.vBData) || {};
        elemVBData.isDragging = true;
        elem.data(selectors.vBData, elemVBData);

        $(selectors.editor).append(shadow);

        return shadow;
    }

})();