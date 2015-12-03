(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;
    var activateService = vBootstrap.core.activate.activateService;
    var informatorConfig = vBootstrap.config.tools.informator;

    namespace('vBootstrap.tools.inform').informator = new vBInformator();

    function vBInformator() {
        activateService.activeElement
            .skipDuplicates()
            .onValue(showInformation);
    }

    function showInformation(elem) {
        $('.' + informatorConfig.cssClass).stop()
            .fadeOut(informatorConfig.fadeOut, function () {
                var vBData = vBUtils.getVBData(this);
                if (vBData.removeInfo)
                    vBData.removeInfo();
            });

        if (elem) {
            var info = createÏnfo(elem);
            $(selectors.editor).append(info);
            info.fadeIn(informatorConfig.fadeIn);
        }
    }

    function createÏnfo(elem) {
        var getInfo = vBUtils.getVBData(elem).getInfo || function () { return '- no info -'; };
        var template = informatorConfig.template.replace('${info}', getInfo());
        var info = $(template);

        var offset = $(elem).offset();
        info.hide()
            .addClass(informatorConfig.cssClass)
            .css({
                top: offset.top - 12,
                left: offset.left + 28
            });

        return info;
    }

})();