(function (global) {
    "use strict";
    namespace('vBootstrap.config').dragDrop = {
        threshold: 6,
        padding: 8,
        cssClasses: {
            dragging: 'dragging',
            draggingNotAllowed: 'dragging-not-allowed',
            dropable: 'dropable',
            dropableActive: 'dropable-active',
            dropableTargetFirst: 'dropable-target-first',
            dropableTargetPrevious: 'dropable-target-previous',
            dropableTargetAfter: 'dropable-target-after'
        }
    };
})(window);