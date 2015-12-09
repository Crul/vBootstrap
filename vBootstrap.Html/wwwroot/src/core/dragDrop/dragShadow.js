(function () {
    "use strict";
    var globalStreams = vBootstrap.config.streams.global;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    namespace('vBootstrap.core.dragDrop').DragShadow = DragShadow;

    function DragShadow(editor, jElem, ev, offset) {
        var jShadow = createShadowElem(jElem);

        this.jElem = jShadow;
        this.source = jElem;
        this.remove = removeShadow;

        offset = offset || getOffsetFn(jShadow);
        moveElement(ev);
        var unsubMousemove = globalStreams.mousemove.onValue(moveElement);

        function moveElement(ev) {
            var css = {
                top: ev.pageY - offset.y,
                left: ev.pageX - offset.x
            };
            jShadow.css(css);
        }

        function removeShadow() {
            this.jElem.remove();
            unsubMousemove();
        }

        function createShadowElem(jElem) {
            var jShadow = jElem.clone();

            if (jElem.outerWidth()) {
                jShadow.width(jElem.outerWidth());
                jShadow.height(jElem.outerHeight());
            }

            jShadow.css('position', 'absolute');
            jShadow.addClass(dragDropCss.dragging);
            editor.jElem.append(jShadow);

            return jShadow;
        }
    }

    function getOffsetFn(_shadow) {
        return {
            x: _shadow.outerWidth() / 2,
            y: _shadow.outerHeight() / 2
        };
    }
})();