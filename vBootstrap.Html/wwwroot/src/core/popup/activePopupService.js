(function () {
    "use strict";
    var popupConfig = namespace('vBootstrap.config.tools.popup');

    ActivePopupService.prototype.addPopup = addPopup;
    namespace('vBootstrap.core.popup').ActivePopupService = ActivePopupService;
    vBootstrap.addFactory(ActivePopupService);

    function ActivePopupService(editor) {
        this.editor = editor;
        this.popups = [];
        createPopupContainer.call(this);

        var dependencies = {
            activateService: namespace('vBootstrap.core.activate.ActivateService')
        };
        editor.resolve(dependencies, load, this);
    }

    function load(activateService) {
        this.editor.activePopupService = this;

        var dis = this;
        var dispose = activateService.activeElement
            .skipDuplicates()
            .onValue(_showPopups);

        this.editor.bus.onEnd(dispose);

        function _showPopups(element) {
            showPopups.call(dis, element);
        }
    }
    
    function addPopup(popup) {
        this.popups.push(popup);
        this.popupContainer.prepend(popup.jElem); // prepend because Bacon executes streams in reverse order (?)
    }

    function showPopups(element) {
        hidePopups.call(this);
        if (!element) return;

        setContainerPosition.call(this, element);
        $(this.popups).each(showPopup);
        this.popupContainer.stop().fadeIn();

        function showPopup(i, popup) {
            popup.show(element);
        }
    }

    function hidePopups() {
        $(this.popups).each(hidePopup);
        this.popupContainer.hide();

        function hidePopup(i, popup) {
            popup.hide();
        }
    }

    function setContainerPosition(element) {
        var offset = element.jElem.offset();
        this.popupContainer.css({
            top: offset.top - popupConfig.position.top,
            left: offset.left + popupConfig.position.right
        })
    }

    function createPopupContainer() {
        this.popupContainer = $('<div />').addClass(popupConfig.cssClasses.popupContainer);
        this.editor.jElem.append(this.popupContainer);
    }
})();