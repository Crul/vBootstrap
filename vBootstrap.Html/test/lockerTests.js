/// <reference path="jasmine/jasmine.js"/>
/// <reference path="../wwwroot/js/jquery.js"/>
/// <reference path="../wwwroot/js/Bacon.js"/>
/// <reference path="../wwwroot/src/seedwork/namespace.js" />
/// <reference path="../wwwroot/src/core/lock/locker.js" />

describe("locker", function () {
    var locker;
    var output;
    var runs;
    var waitForDone = 500;

    beforeEach(initBeforeEach);
    function initBeforeEach() {
        locker = new vBootstrap.core.lock.locker();
        output = undefined;
        runs = 0;
    }

    //afterEach(initBeforeEach);
    //function afterEach(done) {
    //    setTimeout(done, waitForDone);
    //}

    it("should NOT lock when NO locks", function () {
        locker.isLocked.onValue(setOutput);

        expect(output).toBe(false);
        expect(runs).toBe(1);
    });

    it("should NOT lock when 1 false", function () {
        locker.isLocked.onValue(setOutput);
        addConstantLock(false);

        expect(output).toBe(false);
        expect(runs).toBe(2);
    });

    it("should NOT lock when 2 false", function () {
        locker.isLocked.onValue(setOutput);
        addConstantLock(false);
        addConstantLock(false);

        expect(output).toBe(false);
        expect(runs).toBe(3);
    });

    it("should lock when 1 true", function () {
        locker.isLocked.onValue(setOutput);
        addConstantLock(true);

        expect(output).toBe(true);
        expect(runs).toBe(2);
    });

    it("should lock when 1 false and 1 true", function () {
        locker.isLocked.onValue(setOutput);
        addConstantLock(true);
        addConstantLock(false);

        expect(output).toBe(true);
        expect(runs).toBe(3);
    });

    function addConstantLock(value) {
        locker.lockOn(Bacon.constant(value));
    }

    function setOutput(value) {
        output = value;
        runs++;
    }

    function expectActivatedToBe(value) {
        testUtils.expect.matchCssClass(childest.elem, 'activated').toBe(value);
    }
});