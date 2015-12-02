(function () {
    "use strict";
    var events = vBootstrap.config.events;
    var activateService = vBootstrap.core.activate.activateService;

    namespace('vBootstrap.tools').removator = new vBRemovator();

    function vBRemovator() {
        activateService.activeElement
            .skipDuplicates()
            .onValue(showRemoveButton);
    }

    function showRemoveButton(elem) {
        $('.btn-removator').stop().fadeOut();

        if (!elem)
            return;

        var btn = $('<div />');
        btn.addClass('btn btn-danger btn-removator').html('&times;').css({
            display: 'none',
            position: 'absolute',
            top: $(elem).offset().top - 16,
            left: $(elem).offset().left + 4,
            padding: '0 5.5px'
        });

        var isOver = btn.asEventStream(events.mouseover).map(true)
            .merge(btn.asEventStream(events.mouseout).map(false))
            .toProperty(false);

        btn.asEventStream(events.mouseclick).onValue(function () {
            btn.remove();
            $(elem).remove();
            activateService.removeLockOn(isOver);
        })

        activateService.lockOn(isOver);

        $(document.body).append(btn);
        btn.fadeIn();
    }

})();