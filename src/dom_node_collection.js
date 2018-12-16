class DOMNodeCollection {
    constructor(nodes) {
        this.nodes = nodes;
    }

    each(callback) {
        this.nodes.forEach(callback);
    }

    html(html) {
        if (typeof html === "string") {
            this.each((node) => {
                node.innerHTML = html;
            });
        } else if (this.nodes.length) {
            return this.nodes[0].innerHTML;
        }
    }
}

module.exports = DOMNodeCollection;