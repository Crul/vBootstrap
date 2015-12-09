(function () {
    "use strict";
    var vBUtils = vBootstrap.utils;
    var selectors = vBootstrap.config.selectors;

    ElementFactory.prototype.create = createElement;
    ElementFactory.prototype.resetFeatures = resetFeatures;
    namespace('vBootstrap.core').ElementFactory = ElementFactory;

    function ElementFactory(editor) {
        this.editor = editor;

        this.features
        checkConfig.call(this);
        addDefaultFeatures.call(this);

        runFactory.call(this);
    }

    function checkConfig() {
        if (!this.config) throw 'BootstrapElement: undefined config';
        if (!this.config.selector) throw 'BootstrapElement: undefined config.selector';
        this.config.features = this.config.features || [];
    }

    function addDefaultFeatures() {
        var defaultFeatures = [
            namespace('vBootstrap.core.lock.lockable'),
            namespace('vBootstrap.core.activate.activatable')
        ];
        this.config.features = defaultFeatures.concat(this.config.features);
    }

    function resetFeatures(features) {
        this.config.features = features || [];
    }

    function runFactory() {
        var factory = this;
        factory.editor.bus
            .filter(isElement)
            .onValue(function (elem) {
                createElement.call(factory, elem);
            });

        function isElement(elem) {
            return $(elem).is(factory.config.selector);
        }
    }

    function createElement(elem) {
        var jElem = $(elem || this.config.template.clone()[0]);
        var element = new vBootstrap.core.Element(this.editor, jElem);
        Bacon.fromArray(this.config.features).onValue(createFeatureElem);
        return jElem;

        function createFeatureElem(feature) {
            feature.init(element);
        }
    }

})();