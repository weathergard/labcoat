let rTranspiled = /labcoat-transpiled/

/**
 * Finds the first <main> element in the markup and returns it.
 * @function
 * @param {String} markup
 * @return {String|Null}
 */
export default function (markup) {
  if (rTranspiled.test(markup)) return null
  return markup
}
