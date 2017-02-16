const rTranspiled = /labcoat-transpiled/

/**
 * Finds the first <main> element in the markup and returns it.
 * @param {String} markup
 * @return {String|Null}
 */
export default markup => rTranspiled.test(markup) ? null : markup
