(function () {
    "use strict";
    var events = namespace('vBootstrap.config.events');
    var PopupElement = namespace('vBootstrap.core.popup.PopupElement');
    var informatorConfig = namespace('vBootstrap.config.tools.informator');

    InformatorPopup.prototype.onShow = showInfo;
    $.extend(InformatorPopup.prototype, PopupElement.prototype);
    namespace('vBootstrap.tools.popup').RemovatorPopup = InformatorPopup;
    vBootstrap.addFactory(InformatorPopup);

    function InformatorPopup(editor) {
        this.editor = editor;
        this.template = informatorConfig.template;
        PopupElement.call(this, editor);
        this.jLabel = this.jElem.find(informatorConfig.labelSelector);
    }

    function showInfo(element) {
        var info = getInfo(element);
        this.jLabel.html(info);
    }

    function getInfo(element) {
        if (element.getInfo)
            return element.getInfo();

        var cssClasses = element.jElem.attr('class').split(' ');
        cssClasses.push('- no class -');
        return element.jElem.prop('tagName') + ' ' + cssClasses[0];
    }
})();