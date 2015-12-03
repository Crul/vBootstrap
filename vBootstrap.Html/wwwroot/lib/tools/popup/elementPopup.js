(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    var activateService = vBootstrap.core.activate.activateService;

    namespace('vBootstrap.tools.popup').elementPopup = vBElementPopup;

    function vBElementPopup(config) {
        this.config = config;

        var dis = this;
        activateService.activeElement
            .skipDuplicates()
            .onValue(_showPopup);

        function _showPopup(elem) {
            dis.showPopup(elem);
        }
    }

    vBElementPopup.prototype.showPopup = showPopup;
    vBElementPopup.prototype.createPopup = createPopup;

    function showPopup(elem) {
        var dis = this;
        var config = dis.config;
        $('.' + config.cssClass).each(removePopup);

        if (!elem) return;

        var popup = dis.createPopup(elem);

        var elemVBData = vBUtils.getVBData(elem);
        if (elemVBData.onDispose)
            elemVBData.onDispose(removePopupElem);

        $(selectors.editor).append(popup);

        function removePopupElem() {
            removePopup.call(popup);

            if (elemVBData.removeOnDispose)
                elemVBData.removeOnDispose(removePopupElem);
        }

        function removePopup() {
            if (config.onRemove)
                config.onRemove(this);

            this.remove();
        }
    }

    function createPopup(elem) {
        if (!elem) return;

        var config = this.config;
        var template = config.getTemplate(elem);
        var popup = $(template);

        var offset = $(elem).offset();
        popup.hide()
            .addClass(config.cssClass)
            .css(config.getPosition(elem))
            .fadeIn(config.fadeIn);

        if (config.onCreate)
            config.onCreate(popup, elem);

        return popup;
    }

})();