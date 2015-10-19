module dom {

    /**
     * Shortcut for querySelector
     * @param {String} selector - the css selector
     * @param {Element} scope - the scope element to search in
     * @returns {Element|null} - the found element or null if not found
     */
    export function qs(selector: string, scope?: HTMLElement) {
        return <HTMLElement>(scope || document).querySelector(selector);
    };

    /**
     * Shortcut for querySelectorAll with conversion from NodeList to Array
     * @param {String} selector - the css selector
     * @param {Element} scope - the scope element to search in
     * @returns {Array<Element>} - array of found elements or an empty array
     */
    export function qsa(selector: string, scope?: HTMLElement) {
        var elems = (scope || document).querySelectorAll(selector);
        return Array.prototype.slice.call(elems);
    };
	
}