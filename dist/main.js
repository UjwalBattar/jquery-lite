/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n    constructor(nodes) {\n        this.nodes = nodes;\n    }\n\n    each(callback) {\n        this.nodes.forEach(callback);\n    }\n\n    html(html) {\n        if (typeof html === 'string') {\n            this.each((node) => {\n                node.innerHTML = html;\n            });\n        } else if (this.nodes.length) {\n            return this.nodes[0].innerHTML;\n        }\n    }\n\n    empty() {\n        this.html('');\n    }\n\n    append(children) {\n        if (!this.nodes.length) return;\n\n        if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {\n            children = $l(children);\n        }\n\n        if (typeof children === 'string') {\n            this.each((node) => {\n                node.innerHTML += children;\n            });\n        } else if (children instanceof DOMNodeCollection) {\n            this.each((node) => {\n                children.each((child) => {\n                    node.appendChild(child.cloneNode(true));\n                });\n            });\n        }\n    }\n\n    attr(key, val) {\n        if (typeof val === 'string') {\n            this.each(node => node.setAttribute(key, val));\n        } else {\n            return this.nodes[0].getAttribute(key);\n        }\n    }\n\n    addClass(className) {\n        this.each((node) => {\n            node.classList.add(className);\n        });\n    }\n\n    removeClass(className) {\n        this.each((node) => {\n            node.classList.removeClass(className);\n        });\n    }\n\n    children() {\n        let childNodes = [];\n\n        this.each((node) => {\n            childNodes = childNodes.concat(Array.from(node.children));\n        });\n\n        return new DOMNodeCollection(childNodes);\n    }\n\n    parent() {\n        let parentNodes = [];\n\n        this.each((node) => {\n            let parent = node.parentNode;\n            if (!parent.visited) {\n                parentNodes.push(parent);\n                parent.visited = true;\n            }\n        });\n\n        parentNodes.forEach((node) => {\n            node.visited = false;\n        });\n\n        return new DOMNodeCollection(parentNodes);\n    }\n\n    remove() {\n        this.each((node) => {\n            node.parentNode.removeChild(node);\n        });\n    }\n\n    on(eventName, callback) {\n        this.each((node) => {\n            node.addEventListener(eventName, callback);\n            let eventKey = `jqliteEvents-${eventName}`;\n            if (node[eventKey] === undefined) {\n                node[eventKey] = [];\n            }\n            node[eventKey].push(callback);\n        });\n    }\n\n    off(eventName) {\n        this.each((node) => {\n            let eventKey = `jqliteEvents-${eventName}`;\n            if (node[eventKey]) {\n                node[eventKey].forEach((callback) => {\n                    node.removeEventListener(eventName, callback);\n                });\n            }\n            node[eventKey] = [];\n        });\n    }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nconst $l = function (args) {\n    switch (typeof args) {\n        case \"string\":\n            return Array.prototype.slice.call(document.querySelectorAll(args));\n        case \"object\":\n            if (args instanceof HTMLElement) {\n                return new DOMNodeCollection([args]);\n            }\n    }\n};\n\nwindow.$l = $l;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });