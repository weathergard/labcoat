'use strict'

const rTranspiled = /labcoat-transpiled/

/**
 * Finds the first <main> element in the markup and returns it.
 * @param {String} markup
 * @return {String|null}
 */
module.exports = markup => rTranspiled.test(markup) ? null : markup
