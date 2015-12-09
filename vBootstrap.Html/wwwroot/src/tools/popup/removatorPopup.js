(function () {
    "use strict";
    var events = namespace('vBootstrap.config.events');
    var PopupElement = namespace('vBootstrap.core.popup.PopupElement');
    var removatorConfig = namespace('vBootstrap.config.tools.removator');

    RemovatorPopup.prototype.onShow = bindEvents;
    RemovatorPopup.prototype.onHide = unbindEvents;
    $.extend(RemovatorPopup.prototype, PopupElement.prototype);
    namespace('vBootstrap.tools.popup').RemovatorPopup = RemovatorPopup;
    vBootstrap.addFactory(RemovatorPopup);

    function RemovatorPopup(editor) {
        this.editor = editor;
        this.template = removatorConfig.template;
        PopupElement.call(this, editor);

        var dependencies = {
            activateService: namespace('vBootstrap.core.activate.ActivateService')
        };
        editor.resolve(dependencies, load, this);
    }

    function load(activateService) {
        this.activateService = activateService;
    }

    function bindEvents() {
        this.unsubscribeClick = this.activateService
            .activeElement
            .sampledBy(this.jElem.asEventStream(events.mouseclick))
            .onValue(function (element) {
                element.dispose();
            });
    }

    function unbindEvents() {
        if (this.unsubscribeClick)
            this.unsubscribeClick();
        this.unsubscribeClick = undefined;
    }
})();