/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="utils/testUtils.js" />
/// <reference path="mock/seedwork/utils.js" />
/// <reference path="mock/config/streams.js" />
/// <reference path="../wwwroot/src/config/dragDrop.js" />
/// <reference path="../wwwroot/src/core/dragDrop/dropTargetSelector.js" />

describe("drop target selector", function () {
    var testUtils = vBootstrap.test.utils;
    var dragDropCss = vBootstrap.config.dragDrop.cssClasses;

    var dropTargetSelector;
    var target;
    var editor;
    var mousemoveBus;
    var mousemoveEvent;
    var candidate;

    beforeEach(initBeforeEach);
    function initBeforeEach() {
        mousemoveEvent = { pageX: 0, pageY: 0 };
        mousemoveBus = vBootstrap.config.streams.mock.setGlobalPushable('mousemove');
        target = undefined;
        candidate = testUtils.getDomElement();
        otherCandidate = testUtils.getDomElement();
        editor = {
            elem: testUtils.getDomElement(),
            dragDropService: {}
        };
        $(editor.elem).append(candidate);
        $(editor.elem).append(otherCandidate);
        spyOn(vBootstrap.utils, 'getChildest').and.returnValue(candidate);
        vBootstrap.utils.getIsEvBeforeElem = jasmine.createSpy('getIsEvBeforeElem').and.returnValue(true);
        vBootstrap.utils.getSortByDistanceFn = jasmine.createSpy('getSortByDistanceFn');
    }

    it("should set dropable target", function () {
        setConstantDraggingDropTargetSelector(true);

        startDropTargetSelectorWithEvents();

        expect(vBootstrap.utils.getChildest).toHaveBeenCalled();
        expect(vBootstrap.utils.getChildest).toHaveBeenCalledWith(editor.elem, 'dropable');
        expect(target).not.toBe(undefined);
        expect($(candidate).hasClass(dragDropCss.dropableActive)).toBe(true);
        expect($(target).attr('class')).toMatch(/dropable-target-/);
    });
    
    it("should set dropable target first when target has no children", function () {
        setConstantDraggingDropTargetSelector(true);

        startDropTargetSelectorWithEvents();

        expectCandidateHasDropableTargetFirstChild();
    });

    it("should set dropable child when target has children", function () {
        var candidateChild = addCandidateChild();
        setConstantDraggingDropTargetSelector(true);

        startDropTargetSelectorWithEvents();

        expect($(candidate).hasClass(dragDropCss.dropableActive)).toBe(true);
        expect(target).toBe(candidateChild);
    });

    it("should set dropable-previous when mouse is before target", function () {
        var candidateChild = addCandidateChild();
        setConstantDraggingDropTargetSelector(true);
        vBootstrap.utils.setVBData = jasmine.createSpy();
        vBootstrap.utils.getIsEvBeforeElem = jasmine.createSpy('getIsEvBeforeElem').and.returnValue(true);

        startDropTargetSelectorWithEvents();

        expect($(candidateChild).attr('class')).toBe(dragDropCss.dropableTargetPrevious);
        var vBDataArg = jasmine.objectContaining({ isDraggingBefore: true });
        expect(vBootstrap.utils.setVBData).toHaveBeenCalledWith(candidateChild, vBDataArg);
    });

    it("should set dropable-after when mouse is NOT before target", function () {
        var candidateChild = addCandidateChild();
        setConstantDraggingDropTargetSelector(true);
        vBootstrap.utils.setVBData = jasmine.createSpy();
        vBootstrap.utils.getIsEvBeforeElem = jasmine.createSpy('getIsEvBeforeElem').and.returnValue(false);

        startDropTargetSelectorWithEvents();

        expect($(candidateChild).attr('class')).toBe(dragDropCss.dropableTargetAfter);
        var vBDataArg = jasmine.objectContaining({ isDraggingBefore: false });
        expect(vBootstrap.utils.setVBData).toHaveBeenCalledWith(candidateChild, vBDataArg);
    });

    it("should set dropable in parent when target is dragging", function () {
        var candidateChild = addCandidateChild();
        var draggingElement = $(testUtils.getDomElement()).addClass(dragDropCss.dragging);
        $(editor.elem).append(draggingElement);
        var candidateParent = testUtils.getDomElement();
        $(candidateParent).append(candidate);
        $(editor.elem).append(candidateParent);
        setConstantDraggingDropTargetSelector(true);
        vBootstrap.utils.getVBData = jasmine.createSpy('getVBData').and.returnValue({ isDragging: true });

        startDropTargetSelectorWithEvents();

        expect($(candidate).attr('class')).toMatch(/dropable-target-/);
        expect($(draggingElement).hasClass(dragDropCss.draggingNotAllowed)).toBe(true);
    });

    it("should change target when changed", function () {
        setConstantDraggingDropTargetSelector(true);
        vBootstrap.utils.getVBData = jasmine.createSpy('getVBData').and.returnValue({ isDragging: false });

        startDropTargetSelectorWithEvents();

        var otherCandidateChild = addOtherCandidateChild();
        vBootstrap.utils.getChildest.and.returnValue(otherCandidate);

        mousemoveBus.push(mousemoveEvent);

        expect($(otherCandidate).hasClass(dragDropCss.dropableActive)).toBe(true);
        expect(target).toBe(otherCandidateChild);
        expect($(target).attr('class')).toMatch(/dropable-target-/);
    });

    it("should stop setting dropable when stop binding", function () {
        setConstantDraggingDropTargetSelector(true);
        vBootstrap.utils.getVBData = jasmine.createSpy('getVBData').and.returnValue({ isDragging: false });

        startDropTargetSelectorWithEvents();
        dropTargetSelector.stopBindingTarget();

        var otherCandidateChild = addOtherCandidateChild();
        vBootstrap.utils.getChildest.and.returnValue(otherCandidate);

        mousemoveBus.push(mousemoveEvent);

        expectCandidateHasDropableTargetFirstChild();
    });

    it("should stop setting dropable when NO mousemove", function () {
        setConstantDraggingDropTargetSelector(true);
        vBootstrap.utils.getVBData = jasmine.createSpy('getVBData').and.returnValue({ isDragging: false });

        startDropTargetSelectorWithEvents();

        var otherCandidateChild = addOtherCandidateChild();
        vBootstrap.utils.getChildest.and.returnValue(otherCandidate);

        expectCandidateHasDropableTargetFirstChild();
    });

    it("should NOT set dropable when is NOT dragging", function () {
        setConstantDraggingDropTargetSelector(false);

        startDropTargetSelectorWithEvents();

        expect(target).toBe(undefined);
        expect($(candidate).hasClass(dragDropCss.dropableActive)).toBe(false);
    });

    function expectCandidateHasDropableTargetFirstChild() {
        var candidateChildren = $(candidate).children();
        expect(candidateChildren.length).toBe(1);
        expect($(candidate).hasClass(dragDropCss.dropableActive)).toBe(true);
        expect(candidateChildren.hasClass(dragDropCss.dropableTargetFirst)).toBe(true);
    }

    function addCandidateChild() {
        var candidateChild = testUtils.getDomElement();
        $(candidate).append(candidateChild);
        function getCandidates() { return [candidateChild]; }
        vBootstrap.utils.getSortByDistanceFn.and.returnValue(getCandidates);
        return candidateChild;
    }

    function addOtherCandidateChild() {
        var otherCandidateChild = testUtils.getDomElement();
        $(otherCandidate).append(otherCandidateChild);
        function getCandidates() { return [otherCandidateChild]; }
        vBootstrap.utils.getSortByDistanceFn.and.returnValue(getCandidates);
        return otherCandidateChild;
    }

    function setConstantDraggingDropTargetSelector(isDragging) {
        editor.dragDropService.isDragging = Bacon.constant(isDragging);
        dropTargetSelector = new vBootstrap.core.dragDrop.dropTargetSelector(editor);
    }

    function startDropTargetSelectorWithEvents() {
        dropTargetSelector.target.onValue(setTargetValue);
        dropTargetSelector.startBindingTarget();
        mousemoveBus.push(mousemoveEvent);
    }

    function setTargetValue(value) {
        target = value;
    }

});