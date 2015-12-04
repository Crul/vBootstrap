(function (global) {
    "use strict";
    namespace('vBootstrap.config').tools = {
        removator: {
            cssClass: 'tool-removator',
            template: '<h5><span class="label label-danger">&times;</span></h5>',
            fadeIn: 200,
            fadeOut: 100,
            position: {
                top: 9,
                right: 2
            }
        },
        editor: {
            cssClass: 'tool-editor',
            template: '<h5><span class="label label-info"><i class="glyphicon glyphicon-pencil"></i></span></h5>',
            fadeIn: 200,
            fadeOut: 100,
            position: {
                top: 9,
                right: 24
            }
        },
        informator: {
            cssClass: 'tool-informator',
            template: '<h5><span class="label label-success">${info}</span></h5>',
            fadeIn: 200,
            fadeOut: 100,
            position: {
                top: 8,
                right: 48
            }
        }
    };
})(window);