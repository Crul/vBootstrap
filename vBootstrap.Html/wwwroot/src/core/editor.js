(function () {
    "use strict";

    Editor.prototype.loadElements = loadElements;
    Editor.prototype.remove = removeEditor;
    Editor.prototype.resolve = resolve;
    Editor.prototype.busByType = busByType;

    namespace('vBootstrap.core').Editor = Editor;

    function Editor(domElem) {
        this.jElem = $(domElem);
        this.bus = new Bacon.Bus();
    }

    function loadElements() {
        var elemArray = this.jElem.find('*').toArray();
        var initialElemStream = Bacon.fromArray(elemArray);
        this.bus.plug(initialElemStream);
    }

    function resolve(dependencies, callback, obj) {
        var editor = this;
        var dependencyProps = Object.keys(dependencies).map(dependencyToProperty);
        return Bacon.combineAsArray(dependencyProps).onValue(onDependenciesValue);

        function onDependenciesValue(args) {
            if (areAllResolved(args)) {
                callback.apply(obj, args);
                return Bacon.noMore;
            }
        }

        function dependencyToProperty(name) {
            return editor.busByType(dependencies[name]).toProperty(editor[name]);
        }
    }

    function removeEditor() {
        this.bus.end();
    }

    function busByType(type) {
        return this.bus.filter(getFilterByTypeFn(type));
    }

    function getFilterByTypeFn(type) {
        return function filterByTypeFn(value) {
            return (value instanceof type);
        }
    }

    function areAllResolved(args) {
        return (args.filter(isUndefined).length == 0);
    }

    function isUndefined(v) {
        return !v;
    }
})();