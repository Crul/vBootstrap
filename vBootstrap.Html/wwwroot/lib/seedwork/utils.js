(function (global) {
    "use strict";
    namespace('vBootstrap').utils = {
        removeCssClass: removeCssClass,
        resetCssClass: resetCssClass
    };

    function resetCssClass(cssClass) {
        $('.' + cssClass).removeClass(cssClass);
    }

    function removeCssClass(cssClass) {
        $('.' + cssClass).remove();
    }

})(window);