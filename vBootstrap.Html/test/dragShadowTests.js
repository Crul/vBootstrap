/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/config/events.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="../wwwroot/src/core/dragDrop/dragShadow.js" />

describe("drag shadow", function () {
    var testUtils = vBootstrap.test.utils;
    var events = vBootstrap.config.events;
    var streams = vBootstrap.config.streams;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;
    var dragShadow = vBootstrap.core.dragDrop.dragShadow;

    var elem;
    var editor;
    var dragDropService;
    var offset = { x: 10, y: 20 };
    var ev = { pageX: 100, pageY: 200 };
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        vBootstrap.utils.setVBData = jasmine.createSpy('setVBData');
        editor = testUtils.getBootstrapElement();
        dragDropService = {
            startDrag: jasmine.createSpy('startDrag')
        };
        elem = testUtils.getDomElement();
    }

    it("should create shadow", function () {
        var shadow = dragShadow(editor, dragDropService, elem, ev, offset);

        expect(shadow.css('left')).toBe('90px');
        expect(shadow.css('top')).toBe('180px');
        expect(dragDropService.startDrag).toHaveBeenCalledWith(ev);
        var editorChildren = $(editor.elem).children();
        var childrenCount = editorChildren.length;
        expect(childrenCount).toBe(1);
        if (childrenCount > 0) expect(editorChildren[0]).toBe(shadow[0]);
        expect(shadow.hasClass(dragDropCss.dragging)).toBe(true);
        expect(vBootstrap.utils.setVBData.calls.count()).toBe(2);
        expect(vBootstrap.utils.setVBData).toHaveBeenCalledWith(shadow, jasmine.any(Object));
        expect(vBootstrap.utils.setVBData).toHaveBeenCalledWith(elem, jasmine.objectContaining({ isDragging: true }));
    });

    it("should remove shadow", function () {
        var mouseupBus = streams.mock.setGlobalPushable('mouseup');
        var shadow = dragShadow(editor, dragDropService, elem, ev, offset);
        mouseupBus.push({});

        expect(vBootstrap.utils.setVBData.calls.count()).toBe(3);
        expect(vBootstrap.utils.setVBData).toHaveBeenCalledWith(elem, jasmine.objectContaining({ isDragging: false }));
    });

    it("should move shadow", function () {
        var mousemoveBus = streams.mock.setGlobalPushable('mousemove');
        var shadow = dragShadow(editor, dragDropService, elem, ev, offset);

        ev.pageX = 1000;
        ev.pageY = 2000;
        mousemoveBus.push(ev);

        expect(shadow.css('left')).toBe('990px');
        expect(shadow.css('top')).toBe('1980px');
    });

    it("should stop moving shadow", function () {
        var mouseupBus = streams.mock.setGlobalPushable('mouseup');
        var mousemoveBus = streams.mock.setGlobalPushable('mousemove');
        var shadow = dragShadow(editor, dragDropService, elem, ev, offset);

        ev.pageX = 1000;
        ev.pageY = 2000;
        mousemoveBus.push(ev);
        mouseupBus.push({});

        ev.pageX = 10;
        ev.pageY = 20;
        mousemoveBus.push(ev);

        expect(shadow.css('left')).toBe('990px');
        expect(shadow.css('top')).toBe('1980px');
    });


});