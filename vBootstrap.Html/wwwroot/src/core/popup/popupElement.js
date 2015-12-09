(function () {
    "use strict";
    var events = namespace('vBootstrap.config.events');

    PopupElement.prototype.show = showPopup;
    PopupElement.prototype.hide = hidePopup;
    namespace('vBootstrap.core.popup').PopupElement = PopupElement;

    function PopupElement(editor) {
        this.editor = editor;
        createjElem.call(this);
        var dependencies = {
            lockService: namespace('vBootstrap.core.lock.Locker'),
            activePopupService: namespace('vBootstrap.core.popup.ActivePopupService')
        };
        editor.resolve(dependencies, load, this);
    }

    function load(lockService, activePopupService) {
        this.lockService = lockService;
        this.activePopupService = activePopupService;

        activePopupService.addPopup(this);
        lockOnOver.call(this);
    }
    
    function showPopup(element) {
        this.element = element;
        this.jElem.show();

        if (this.onShow)
            this.onShow(element);

        setOnDispose.call(this);
    }

    function hidePopup() {
        this.jElem.hide();

        if (this.onHide)
            this.onHide();

        removeOnDispose.call(this);
    }

    function setOnDispose() {
        var dis = this;
        this.onElementDispose = onElementDispose;
        this.element.onDispose(this.onElementDispose);
        function onElementDispose() {
            dis.hide();
        }
    }

    function removeOnDispose() {
        if (this.element && this.onElementDispose)
            this.element.removeOnDispose(this.onElementDispose);
        this.onElementDispose = undefined;
    }

    function lockOnOver() {
        var isOver = this.jElem.asEventStream(events.mouseover).map(true)
            .merge(this.jElem.asEventStream(events.mouseout).map(false))
            .toProperty(false);

        this.lockService.lockOn(isOver);
        this.editor.bus.onEnd(removeLockOn);

        function removeLockOn() {
            lockService.removeLockOn(isOver);
        }
    }

    function createjElem() {
        this.jElem = $(this.template);
        if (this.onCreate) this.onCreate();
    }

})();