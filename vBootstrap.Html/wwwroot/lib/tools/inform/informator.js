(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var informatorConfig = vBootstrap.config.tools.informator;

    var elementPopup = vBootstrap.tools.popup.elementPopup;
    var popupConfig = informatorConfig;
    popupConfig.getTemplate = getTemplate;
    popupConfig.getPosition = getPosition;
    popupConfig.onCreate = bindRefreshOnCreate;

    namespace('vBootstrap.tools.inform').informator = new elementPopup(popupConfig);

    function getTemplate(elem) {
        var getInfoFn = vBUtils.getVBData(elem).getInfo || defaultInfo;
        return informatorConfig.template.replace('${info}', getInfoFn());
    }

    function getPosition(elem) {
        var offset = $(elem).offset();
        return {
            top: offset.top - popupConfig.position.top,
            left: offset.left + popupConfig.position.right
        };
    }

    function bindRefreshOnCreate(popup, elem) {
        var elemVBData = vBUtils.getVBData(elem);
        if (elemVBData.isResizing) {
            var unsubResizing = elemVBData.isResizing
                .sampledBy(vBootstrap.config.streams.global.mousemove)
                .filter(Bacon._.id)
                .onValue(refreshInfo);

            elemVBData.onDispose(unsubResizing);
        }

        function refreshInfo() {
            var template = getTemplate(elem);
            popup.html($(template).html());
        }
    }

})();