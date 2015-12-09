/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="../wwwroot/src/core/dragDrop/dragShadow.js" />

describe("drag shadow", function () {
    namespace('vBootstrap.utils');

    var testUtils = vBootstrap.test.utils;
    var streams = vBootstrap.config.streams;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;
    var DragShadow = vBootstrap.core.dragDrop.DragShadow;

    var jElem;
    var editor;
    var offset = { x: 10, y: 20 };
    var ev = { pageX: 100, pageY: 200 };
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        editor = testUtils.getEditor();
        jElem = testUtils.getDomElement();
    }

    it("should create shadow", function () {
        var shadow = new DragShadow(editor, jElem, ev, offset);

        var jShadow = shadow.jElem;
        expect(jShadow.css('left')).toBe('90px');
        expect(jShadow.css('top')).toBe('180px');

        var editorChildren = editor.jElem.children();
        expect(jShadow.hasClass(dragDropCss.dragging)).toBe(true);
        expect(editorChildren.length).toBe(1);
        expect(editorChildren[0]).toBe(jShadow[0]);
    });

    it("should move shadow", function () {
        var mousemoveBus = streams.mock.setGlobalPushable('mousemove');

        var shadow = new DragShadow(editor, jElem, ev, offset);
        ev.pageX = 1000;
        ev.pageY = 2000;
        mousemoveBus.push(ev);

        var jShadow = shadow.jElem;
        expect(jShadow.css('top')).toBe('1980px');
        expect(jShadow.css('left')).toBe('990px');
    });

    it("should remove shadow", function () {

        var shadow = new DragShadow(editor, jElem, ev, offset);
        shadow.remove();

        var editorChildren = editor.jElem.children();
        expect(editorChildren.length).toBe(0);
    });

    it("should stop moving when removed", function () {
        var mousemoveBus = streams.mock.setGlobalPushable('mousemove');

        var shadow = new DragShadow(editor, jElem, ev, offset);
        shadow.remove();
        var jShadow = shadow.jElem;
        var topCssBeforePush = jShadow.css('top');
        var leftCssBeforePush = jShadow.css('left');
        mousemoveBus.push(ev);

        expect(jShadow.css('top')).toBe(topCssBeforePush);
        expect(jShadow.css('left')).toBe(leftCssBeforePush);
    });


});