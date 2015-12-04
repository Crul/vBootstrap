(function () {
    "use strict";
    namespace('vBootstrap.bootstrap').col = vBCol;
    vBCol.selector = vBootstrap.config.selectors.bootstrap.col;
    vBCol.template = $('<div />').addClass('col-xs-4');

    function vBCol(editor, elem) {
        this.elem = elem || vBCol.template.clone()[0];
        vBootstrap.core.bootstrapElement.call(this);

        getColSizes(this);

        vBootstrap.core.lock.lockable.init(editor.lockService, this);
        vBootstrap.core.activate.activatable.init(editor.lockService, this);
        vBootstrap.core.resize.columnResizable.init(this);
        vBootstrap.core.resize.verticalResizable.init(this);
        vBootstrap.core.dragDrop.selfDraggable.init(editor.dragDropService, this);
        vBootstrap.core.dragDrop.dropable.init(editor.dragDropService, this);
        vBootstrap.tools.inform.informable.init(this, 'col');
    }

    vBCol.prototype = $.extend(vBCol.prototype, vBootstrap.core.bootstrapElement.prototype);

    vBCol.prototype.getInfo = getInfo;
    function getInfo() {
        var dis = this;
        return Object.keys(dis.sizes).map(getColClass).join('');

        function getColClass(size) {
            if (dis.sizes[size])
                return ' col-' + size + '-' + dis.sizes[size];
            else
                return;
        }
    }

    function getColSizes(obj) {
        var jElem = $(obj.elem);
        var cssClass = jElem.attr('class');
        obj.sizes = {
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

})();