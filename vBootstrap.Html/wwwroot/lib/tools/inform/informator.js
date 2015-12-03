(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var informatorConfig = vBootstrap.config.tools.informator;

    var elementPopup = vBootstrap.tools.popup.elementPopup;
    var popupConfig = informatorConfig;
    popupConfig.getTemplate = getTemplate;
    popupConfig.getPosition = getPosition;

    namespace('vBootstrap.tools.inform').informator = new elementPopup(popupConfig);

    function getTemplate(elem) {
        var getInfoFn = vBUtils.getVBData(elem).getInfo || defaultInfo;
        return informatorConfig.template.replace('${info}', getInfoFn());
    }

    function getPosition(elem) {
        var offset = $(elem).offset();
        return {
            top: offset.top - 12,
            left: offset.left + 28
        };
    }

})();