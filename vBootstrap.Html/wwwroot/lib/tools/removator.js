(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var events = vBootstrap.config.events;
    var removatorConfig = vBootstrap.config.tools.removator;
    var activateService = vBootstrap.core.activate.activateService;

    var elementPopup = vBootstrap.tools.popup.elementPopup;
    var popupConfig = removatorConfig;
    popupConfig.getTemplate = getTemplate;
    popupConfig.getPosition = getPosition;
    popupConfig.onCreate = bindEventsOnCreate;
    popupConfig.onRemove = unbindEventsOnRemove;

    namespace('vBootstrap.tools').removator = new elementPopup(popupConfig);

    function getTemplate(elem) {
        return removatorConfig.template;
    }

    function getPosition(elem) {
        var offset = $(elem).offset();
        return {
            top: offset.top - 16,
            left: offset.left + 4
        };
    }

    function bindEventsOnCreate(popup, elem) {
        var btn = popup;

        var isOver = btn.asEventStream(events.mouseover).map(true)
            .merge(btn.asEventStream(events.mouseout).map(false))
            .toProperty(false);

        activateService.lockOn(isOver);

        var unsubscribeClick = btn
            .asEventStream(events.mouseclick)
            .onValue(function () {
                vBUtils.getVBData(elem).dispose(elem);
            });

        vBUtils.setVBData(btn, {
            isOverStream: isOver,
            unsubscribeClick: unsubscribeClick
        });

        vBUtils.getVBData(elem).onDispose(unsubscribeClick);
    }

    function unbindEventsOnRemove(elem) {
        if (elem._isRemoved) console.warn('unbind twice');
        elem._isRemoved = true;

        var elemVBData = vBUtils.getVBData(elem);
        if (elemVBData.unsubscribeClick)
            elemVBData.unsubscribeClick();
        else
            console.warn('undefined unsubscribeClick');

        if (elemVBData.isOverStream)
            activateService.removeLockOn(elemVBData.isOverStream);
        else
            console.warn('undefined isOverStream');
    }
})();