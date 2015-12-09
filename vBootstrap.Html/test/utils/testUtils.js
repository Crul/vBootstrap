(function () {
    "use strict";
    namespace('vBootstrap.test').utils = {
        getEditor: getEditor,
        getBootstrapElement: getBootstrapElement,
        getDomElement: getDomElement,
        lock: {
            getLockedService: getLockedService,
            getNotLockedService: getNotLockedService
        },
        expect: {
            matchCssClass: matchCssClass
        }
    };

    function getEditor() {
        var editor = {
            jElem: getDomElement(),
            bus: {
                onEnd: jasmine.createSpy('onEndEditorBus')
            },
            mock: {
                setDependencies: setDependencies
            }
        };
        setDependencies();

        $(document.body).append(editor.jElem);
        return editor;

        function setDependencies() {
            var dependenciesArray = arguments;
            editor.resolve = fakeResolve;

            function fakeResolve(dependencies, load, elem) {
                load.apply(elem, dependenciesArray)
            };
        }
    }

    function getDomElement() {
        return $('<div />');
    }

    function getBootstrapElement() {
        return {
            jElem: getDomElement(),
            editor: getEditor(),
            elemStreams: {
                mousemove: new Bacon.Bus(),
                mousedown: new Bacon.Bus(),
                mouseout: new Bacon.Bus()
            },
            onDispose: jasmine.createSpy('onDispose')
        };
    }

    function getLockedService() {
        return getLockService(true);
    }

    function getNotLockedService() {
        return getLockService(false);
    }

    function getLockService(locked) {
        vBootstrap.core.lock.lockService.mock.setIsLocked(locked);
        return vBootstrap.core.lock.lockService;
    }

    function matchCssClass(elem, cssClassName) {
        var cssClass = $(elem).attr('class') || '';
        var matches = !!cssClass.match(new RegExp(cssClassName));
        return expect(matches);
    }

})();