(function () {
    "use strict";
    var vBUtils = namespace('vBootstrap.utils');
    var activateCss = namespace('vBootstrap.config.activate.cssClasses');

    namespace('vBootstrap.core.activate').ActivateService = ActivateService;
    vBootstrap.addFactory(ActivateService);

    function ActivateService(editor) {
        this.editor = editor;
        this.activatables = new vBootstrap.CustomStreamArray();

        var dependencies = {
            lockService: namespace('vBootstrap.core.lock.Locker')
        };
        editor.resolve(dependencies, load, this);
    }

    function load(lockService) {
        var childestActivatable = this.activatables.bus
            .filter(lockService.isNotLocked)
            .map(vBUtils.getChildest)
            .map(getElement)
            .skipDuplicates()
            .toProperty();

        this.activeElement = childestActivatable;

        var dispose = childestActivatable.onValue(setActivated);
        this.editor.activateService = this;
        this.editor.bus.onEnd(dispose);
    }

    function setActivated(element) {
        vBUtils.resetCssClass(activateCss.active);
        if (element)
            $(element.jElem).addClass(activateCss.active);
    }

    function getElement(activatable) {
        return activatable ? activatable.element : undefined;
    }
})();