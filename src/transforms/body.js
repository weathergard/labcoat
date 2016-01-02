let rMain = /<main[\s\S]*?<\/main\s*?>/
let rTranspiled = /<main data-transpiled/

/**
 * Finds the first <main> element in the markup and returns it.
 * @function
 * @param {String} markup
 * @return {String|Null}
 */
export default function (markup) {
  if (rTranspiled.test(markup)) return null
  try {
    return markup.match(rMain)[0]
  } catch (err) {
    return null
  }
}
