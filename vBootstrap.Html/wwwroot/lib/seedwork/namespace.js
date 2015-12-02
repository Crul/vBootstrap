(function (global) {
    "use strict";
    global.namespace = namespace;
    
    function namespace(ns) {
        var nsTokens = (ns || '').split('.');
        return recursiveNamespace(nsTokens, global);
    }

    function recursiveNamespace(nsTokens, current) {
        if (nsTokens.length == 0) {
            return current;
        }
        var token = nsTokens.shift();
        current[token] = current[token] || {};
        current = current[token]
        return recursiveNamespace(nsTokens, current);
    }

})(window);