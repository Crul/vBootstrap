/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="../wwwroot/src/core/dragDrop/dropable.js" />

describe("dropable", function () {
    var testUtils = vBootstrap.test.utils;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    var editor;
    var bootstrapElem;
    var onDraggingBus;
    var onStopDragBus;
    vBootstrap.utils.getVBData = function () {
        return { onDispose: function () { } };
    };
    beforeEach(initBeforeEach);

    function initBeforeEach() {
        bootstrapElem = testUtils.getBootstrapElement();
        onDraggingBus = new Bacon.Bus();
        onStopDragBus = new Bacon.Bus();
        editor = {
            elem: testUtils.getDomElement(),
            dragDropService: {
                onDragging: onDraggingBus,
                onStopDrag: onStopDragBus
            }
        };
    }

    it("should have dropable class when dragging over elem", function () {
        spyOn(vBootstrap.utils, 'isCursorOverElem').and.returnValue(true);
        var ev = {};

        vBootstrap.core.dragDrop.dropable.init(editor, bootstrapElem);
        onDraggingBus.push(ev);

        expectDropableClass(bootstrapElem, true);
        expect(vBootstrap.utils.isCursorOverElem)
            .toHaveBeenCalledWith(ev, jasmine.any(Object), jasmine.any(Number));
    });

    it("should NOT have dropable class when NO dragging", function () {
        spyOn(vBootstrap.utils, 'isCursorOverElem').and.returnValue(true);

        vBootstrap.core.dragDrop.dropable.init(editor, bootstrapElem);

        expectDropableClass(bootstrapElem, false);
        expect(vBootstrap.utils.isCursorOverElem).not.toHaveBeenCalled();
    });

    it("should NOT have dropable class when is NOT over elem", function () {
        spyOn(vBootstrap.utils, 'isCursorOverElem').and.returnValue(false);
        var ev = {};

        vBootstrap.core.dragDrop.dropable.init(editor, bootstrapElem);
        onDraggingBus.push(ev);

        expectDropableClass(bootstrapElem, false);
        expect(vBootstrap.utils.isCursorOverElem)
            .toHaveBeenCalledWith(ev, jasmine.any(Object), jasmine.any(Number));
    });

    it("should NOT have dropable class when is descendant of dragging", function () {
        vBootstrap.utils.mock.setIsCursorOverElem(true);
        spyOn(vBootstrap.utils, 'isCursorOverElem').and.returnValue(true);
        var beingDragged = $(testUtils.getDomElement());
        beingDragged.addClass(dragDropCss.beingDragged);
        beingDragged.append(bootstrapElem.elem);
        $(editor.elem).append(beingDragged);

        vBootstrap.core.dragDrop.dropable.init(editor, bootstrapElem);
        onDraggingBus.push({});

        expectDropableClass(bootstrapElem, false);
        expect(vBootstrap.utils.isCursorOverElem).not.toHaveBeenCalled();
    });

    function expectDropableClass(bootstrapElem, value) {
        expect($(bootstrapElem.elem).hasClass(dragDropCss.dropable)).toBe(value);
    }
});