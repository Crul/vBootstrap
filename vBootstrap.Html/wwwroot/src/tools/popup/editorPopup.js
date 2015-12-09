(function () {
    "use strict";
    var events = namespace('vBootstrap.config.events');
    var PopupElement = namespace('vBootstrap.core.popup.PopupElement');
    var editorConfig = namespace('vBootstrap.config.tools.editor');

    EditorPopup.prototype.onShow = bindEvents;
    EditorPopup.prototype.onHide = unbindEvents;
    $.extend(EditorPopup.prototype, PopupElement.prototype);
    namespace('vBootstrap.tools.popup').EditorPopup = EditorPopup;
    vBootstrap.addFactory(EditorPopup);

    function EditorPopup(editor) {
        this.editor = editor;
        this.template = editorConfig.template;
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

    }

    function unbindEvents() {

    }
})();