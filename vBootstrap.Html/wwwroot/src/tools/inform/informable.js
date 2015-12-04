(function () {
    "use strict";

    var vBInformable = {
        init: initInformable
    };

    namespace('vBootstrap.tools.inform').informable = vBInformable;

    function initInformable(obj, info) {
        vBootstrap.utils.setVBData(obj.elem, { getInfo: getInfo });

        function getInfo() {
            return obj.getInfo ? obj.getInfo() : info;
        }
    }

})();