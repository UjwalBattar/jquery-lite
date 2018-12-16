const DOMNodeCollection = require('./dom_node_collection');

const $l = function (args) {
    switch (typeof args) {
        case "string":
            return Array.prototype.slice.call(document.querySelectorAll(args));
        case "object":
            if (args instanceof HTMLElement) {
                return new DOMNodeCollection([args]);
            }
    }
};

window.$l = $l;