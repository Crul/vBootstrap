(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var events = vBootstrap.config.events;
    var selectors = vBootstrap.config.selectors;
    var activateService = vBootstrap.core.activate.activateService;
    var removatorConfig = vBootstrap.config.tools.removator;

    namespace('vBootstrap.tools').removator = new vBRemovator();

    function vBRemovator() {
        activateService.activeElement
            .skipDuplicates()
            .onValue(showRemoveButton);
    }

    function showRemoveButton(elem) {
        $('.' + removatorConfig.cssClass).stop()
            .fadeOut(removatorConfig.fadeOut, function () {
                var vBData = vBUtils.getVBData(this);
                if (vBData.removeBtn)
                    vBData.removeBtn();
            });

        if (elem) {
            var btn = createBtn(elem);
            bindEvents(btn, elem);
            $(selectors.editor).append(btn);
            btn.fadeIn(removatorConfig.fadeIn);
        }
    }

    function createBtn(elem) {
        var btn = $(removatorConfig.template);

        var offset = $(elem).offset();
        btn.hide()
            .addClass(removatorConfig.cssClass)
            .css({
                top: offset.top - 16,
                left: offset.left + 4
            });

        return btn;
    }

    function bindEvents(btn, elem) {
        vBUtils.setVBData(btn, { removeBtn: removeBtn });

        var isOver = btn.asEventStream(events.mouseover).map(true)
            .merge(btn.asEventStream(events.mouseout).map(false))
            .toProperty(false);

        activateService.lockOn(isOver);

        var unsubscribeClick = btn
            .asEventStream(events.mouseclick)
            .onValue(function () {
                vBUtils.getVBData(elem).dispose();
                removeBtn();
            });

        vBUtils.getVBData(elem).onDispose(unsubscribeClick);

        function removeBtn() {
            activateService.removeLockOn(isOver);
            btn.remove();
        }
    }
})();