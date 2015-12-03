(function (global) {
    "use strict";
    namespace('vBootstrap.config').tools = {
        removator: {
            cssClass: 'tool-removator',
            template: '<div class="btn btn-danger">&times;</div>',
            fadeIn: 200,
            fadeOut: 100
        },
        informator: {
            cssClass: 'tool-informator',
            template: '<div class="label label-info" style="position: absolute">${info}</div>',
            fadeIn: 200,
            fadeOut: 100
        }
    };
})(window);