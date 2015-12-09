(function (global) {
    "use strict";
    namespace('vBootstrap.config').tools = {
        popup: {
            position: {
                top: 10,
                right: 2
            },
            cssClasses: {
                popupContainer: 'popup-container'
            }
        },
        removator: {
            template: '<h6 class="popup-btn-removator"><span class="label label-danger"><i class="glyphicon glyphicon-remove"></i></span></h6>'
        },
        editor: {
            template: '<h6 class="popup-btn-editor"><span class="label label-info"><i class="glyphicon glyphicon-pencil"></i></span></h6>'
        },
        informator: {
            labelSelector: '.label',
            template: '<h5 class="popup-btn-informator"><span class="label label-success">[ loading... ]</span></h5>'
        }
    };
})(window);