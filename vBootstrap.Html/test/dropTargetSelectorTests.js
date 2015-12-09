/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/streamsMock.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="../wwwroot/src/core/dragDrop/dropTargetSelector.js" />
/// <reference path="../wwwroot/src/core/elementFactory.js" />

describe("drop target selector", function () {
    namespace('vBootstrap.utils');
    var testUtils = vBootstrap.test.utils;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    var droppableBus;
    var dropTargetSelector;
    var target;
    var editor;
    var droppable;
    var otherDroppable;
    var createElementSpy;

    beforeEach(initBeforeEach);
    function initBeforeEach() {
        target = undefined;
        droppable = { element: testUtils.getBootstrapElement() };
        otherDroppable = { element: testUtils.getBootstrapElement() };
        editor = testUtils.getEditor();
        editor.dragDropService = {
            droppableBus: {
                plug: jasmine.createSpy('plug')
            }
        };
        droppableBus = new Bacon.Bus();
        vBootstrap.CustomStreamArray = function () {
            return {
                add: jasmine.createSpy('addCustomStreamArray'),
                bus: droppableBus
            };
        };
        vBootstrap.utils.hasArrayElems = jasmine.createSpy('hasArrayElems').and.returnValue(true);
        vBootstrap.utils.getChildest = jasmine.createSpy('getChildest').and.returnValue(droppable);
        vBootstrap.utils.getIsEvBeforeElem = jasmine.createSpy('getIsEvBeforeElem').and.returnValue(true);
        vBootstrap.utils.getSortByDistanceFn = jasmine.createSpy('getSortByDistanceFn');
        vBootstrap.utils.resetCssClass = jasmine.createSpy('resetCssClass');
        vBootstrap.utils.removeCssClass = jasmine.createSpy('removeCssClass');
        createElementSpy = jasmine.createSpy('createElement');
        vBootstrap.core.ElementFactory = ElementFactory;

        function ElementFactory() {
            this.create = createElementSpy
            this.resetFeatures = jasmine.createSpy('resetFeatures');
        };
    }

    it("should set droppable target", function () {
        setConstantDraggingDropTargetSelector(true);

        startDropTargetSelectorWithEvents();

        expect(vBootstrap.utils.getChildest).toHaveBeenCalled();
        expect(target).not.toBe(undefined);
        expect(droppable.element.jElem.hasClass(dragDropCss.droppableActive)).toBe(true);
        expect(target.jTarget.attr('class')).toMatch(/droppable-target-/);
    });
    
    it("should set droppable target first when target has no children", function () {
        setConstantDraggingDropTargetSelector(true);

        startDropTargetSelectorWithEvents();

        expectDropabbleHasDroppableTargetFirstChild();
    });

    it("should set droppable child when target has children", function () {
        var droppableChild = addDroppableChild();
        setConstantDraggingDropTargetSelector(true);

        startDropTargetSelectorWithEvents();

        expect(droppable.element.jElem.hasClass(dragDropCss.droppableActive)).toBe(true);
        expect(target.jTarget[0]).toBe(droppableChild.element.jElem[0]);
    });

    it("should set droppable-previous when mouse is before target", function () {
        var droppableChild = addDroppableChild();
        setConstantDraggingDropTargetSelector(true);
        vBootstrap.utils.getIsEvBeforeElem = jasmine.createSpy('getIsEvBeforeElem').and.returnValue(true);

        startDropTargetSelectorWithEvents();

        expect(droppableChild.element.jElem.attr('class')).toBe(dragDropCss.droppableTargetPrevious);
    });

    it("should set droppable-after when mouse is NOT before target", function () {
        var droppableChild = addDroppableChild();
        setConstantDraggingDropTargetSelector(true);

        vBootstrap.utils.getIsEvBeforeElem = jasmine.createSpy('getIsEvBeforeElem').and.returnValue(false);

        startDropTargetSelectorWithEvents();

        expect(droppableChild.element.jElem.attr('class')).toBe(dragDropCss.droppableTargetAfter);
    });

    it("should change target when changed", function () {
        setConstantDraggingDropTargetSelector(true);
        
        startDropTargetSelectorWithEvents();

        var otherDroppableChild = addOtherDroppableChild();
        droppableBus.push(otherDroppable);

        expect(otherDroppable.element.jElem.attr('class')).toMatch(dragDropCss.droppableActive);
        expect(target.jTarget[0]).toBe(otherDroppableChild.element.jElem[0]);
        expect(target.jTarget.attr('class')).toMatch(/droppable-target-/);
    });

    it("should stop setting droppable when stop binding", function () {
        setConstantDraggingDropTargetSelector(true);
        
        startDropTargetSelectorWithEvents();

        var otherDroppableChild = addOtherDroppableChild();
        vBootstrap.utils.getChildest.and.returnValue(otherDroppableChild);
        droppableBus.push(otherDroppableChild);

        expectDropabbleHasDroppableTargetFirstChild();
    });

    it("should stop setting droppable when NO mousemove", function () {
        setConstantDraggingDropTargetSelector(true);
        
        startDropTargetSelectorWithEvents();

        var otherDroppableChild = addOtherDroppableChild();
        vBootstrap.utils.getChildest.and.returnValue(otherDroppableChild);
        droppableBus.push(otherDroppableChild);

        expectDropabbleHasDroppableTargetFirstChild();
    });

    it("should NOT set droppable when is NOT dragging", function () {
        setConstantDraggingDropTargetSelector(false);

        startDropTargetSelectorWithEvents();

        expect(target).toBe(undefined);
        expect(droppable.element.jElem.hasClass(dragDropCss.droppableActive)).toBe(false);
    });

    it("should set droppable to existing elements", function () {
        editor.dragDropService.isDragging = Bacon.constant();
        editor.mock.setDependencies(editor.dragDropService);
        var existingDroppable = testUtils.getDomElement().addClass(dragDropCss.droppable);
        editor.jElem.append(existingDroppable);
        dropTargetSelector = new vBootstrap.core.dragDrop.DropTargetSelector(editor);

        expect(createElementSpy).toHaveBeenCalledWith(existingDroppable[0]);
    });
    
    function addDroppableChild() {
        var droppableChild = testUtils.getDomElement();
        droppable.element.jElem.append(droppableChild);
        function getDroppables() { return [droppableChild]; }
        vBootstrap.utils.getSortByDistanceFn.and.returnValue(getDroppables);
        return { element: { jElem: droppableChild } };
    }

    function addOtherDroppableChild() {
        var otherDroppableChild = testUtils.getDomElement();
        otherDroppable.element.jElem.append(otherDroppableChild);
        function getDroppables() { return [otherDroppableChild]; }
        vBootstrap.utils.getSortByDistanceFn.and.returnValue(getDroppables);
        vBootstrap.utils.getChildest.and.returnValue(otherDroppable);
        return { element: { jElem: otherDroppableChild } };
    }

    function setConstantDraggingDropTargetSelector(isDragging) {
        editor.dragDropService.isDragging = Bacon.constant(isDragging);
        editor.mock.setDependencies(editor.dragDropService);
        dropTargetSelector = new vBootstrap.core.dragDrop.DropTargetSelector(editor);
    }

    function startDropTargetSelectorWithEvents() {
        var droppableTarget = editor.dragDropService.droppableBus.plug.calls.allArgs()[0][0];
        droppableTarget.onValue(setTargetValue);
        droppableBus.push(droppable);
    }

    function expectDropabbleHasDroppableTargetFirstChild() {
        var droppableChildren = droppable.element.jElem.children();
        expect(droppableChildren.length).toBe(1);
        expect(droppable.element.jElem.hasClass(dragDropCss.droppableActive)).toBe(true);
        expect(droppableChildren.hasClass(dragDropCss.droppableTargetFirst)).toBe(true);
    }

    function setTargetValue(value) {
        target = value;
    }

});