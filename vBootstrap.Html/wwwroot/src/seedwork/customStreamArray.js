(function () {

    CustomStreamArray.prototype.add = add;
    CustomStreamArray.prototype.remove = remove;
    CustomStreamArray.prototype.reset = reset;

    namespace('vBootstrap').CustomStreamArray = CustomStreamArray;

    function CustomStreamArray() {
        this.streamArray = [];
        this.bus = Bacon.Bus();
        this.reset();
    }

    function add(stream) {
        this.streamArray.push(stream);
        this.reset();
    }

    function remove(stream) {
        var index = this.streamArray.indexOf(stream);
        if (index > -1) {
            this.streamArray.splice(index, 1);
            this.reset();
        } else {
            console.warn('UnpluggableBus.unplug: stream not found: ', stream);
        }
    }

    function reset() {
        if (this.disposeInternal)
            this.disposeInternal();

        if (this.streamArray.length === 0) {
            this.combinedStream = Bacon.constant([]);
        } else {
            this.combinedStream = Bacon
                .combineAsArray(this.streamArray)
                .map(filterUndefined)
                .skipDuplicates();
        }

        var dis = this;
        this.disposeInternal = this.combinedStream.onValue(pushValue);

        function pushValue(streams) {
            dis.bus.push(streams);
        }
    }

    function filterUndefined(array) {
        return array.filter(Bacon._.id);
    }

})();