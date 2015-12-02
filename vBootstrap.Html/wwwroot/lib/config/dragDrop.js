(function (global) {
    "use strict";
    namespace('vBootstrap.config').dragDrop = {
        threshold: 10,
        padding: 8,
        dragDebounce: 150,
        cssClasses: {
            dragging: 'dragging',
            beingDragged: 'being-dragged',
            draggingNotAllowed: 'dragging-not-allowed',
            dropable: 'dropable',
            dropableActive: 'dropable-active',
            dropableTargetFirst: 'dropable-target-first',
            dropableTargetPrevious: 'dropable-target-previous',
            dropableTargetAfter: 'dropable-target-after'
        }
    };
})(window);