class DOMNodeCollection {
    constructor(nodes) {
        this.nodes = nodes;
    }

    each(callback) {
        this.nodes.forEach(callback);
    }

    html(html) {
        if (typeof html === 'string') {
            this.each((node) => {
                node.innerHTML = html;
            });
        } else if (this.nodes.length) {
            return this.nodes[0].innerHTML;
        }
    }

    empty() {
        this.html('');
    }

    append(children) {
        if (!this.nodes.length) return;

        if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
            children = $l(children);
        }

        if (typeof children === 'string') {
            this.each((node) => {
                node.innerHTML += children;
            });
        } else if (children instanceof DOMNodeCollection) {
            this.each((node) => {
                children.each((child) => {
                    node.appendChild(child.cloneNode(true));
                });
            });
        }
    }

    attr(key, val) {
        if (typeof val === 'string') {
            this.each(node => node.setAttribute(key, val));
        } else {
            return this.nodes[0].getAttribute(key);
        }
    }

    addClass(className) {
        this.each((node) => {
            node.classList.add(className);
        });
    }

    removeClass(className) {
        this.each((node) => {
            node.classList.removeClass(className);
        });
    }

    children() {
        let childNodes = [];

        this.each((node) => {
            childNodes = childNodes.concat(Array.from(node.children));
        });

        return new DOMNodeCollection(childNodes);
    }

    parent() {
        let parentNodes = [];

        this.each((node) => {
            let parent = node.parentNode;
            if (!parent.visited) {
                parentNodes.push(parent);
                parent.visited = true;
            }
        });

        parentNodes.forEach((node) => {
            node.visited = false;
        });

        return new DOMNodeCollection(parentNodes);
    }

    remove() {
        this.each((node) => {
            node.parentNode.removeChild(node);
        });
    }

    on(eventName, callback) {
        this.each((node) => {
            node.addEventListener(eventName, callback);
            let eventKey = `jqliteEvents-${eventName}`;
            if (node[eventKey] === undefined) {
                node[eventKey] = [];
            }
            node[eventKey].push(callback);
        });
    }

    off(eventName) {
        this.each((node) => {
            let eventKey = `jqliteEvents-${eventName}`;
            if (node[eventKey]) {
                node[eventKey].forEach((callback) => {
                    node.removeEventListener(eventName, callback);
                });
            }
            node[eventKey] = [];
        });
    }
}

module.exports = DOMNodeCollection;