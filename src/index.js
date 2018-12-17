const DOMNodeCollection = require('./dom_node_collection');

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = function (args) {
    switch (typeof args) {
        case "function":
            return registerDocReadyCallback(args);
        case "string":
            return getNodesFromDOM(args);
        case "object":
            if (args instanceof HTMLElement) {
                return new DOMNodeCollection([args]);
            }
    }
};

$l.extend = function (baseObj, ...otherObjs) {
    otherObjs.forEach((obj) => {
        Object.assign(baseObj, obj);
    });
    return baseObj;
};

$l.ajax = function (options) {
    console.log('More to come!')
};

getNodesFromDOM = (selector) => {
    let nodes = document.querySelectorAll(selector);
    // let nodesArray = Array.prototype.slice(nodes);
    let nodesArray = Array.from(nodes);
    return new DOMNodeCollection(nodesArray);
};

registerDocReadyCallback = (func) => {
    if (!_docReady) {
        _docReadyCallbacks.push(func);
    } else {
        func();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    _docReady = true;
    _docReadyCallbacks.forEach(func => func());
});