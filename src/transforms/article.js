let rArticle = /<article[\s\S]*?<\/article\s*?>/
let rTranspiled = /<article data-transpiled/

/**
 * Finds the first <article> element in the markup and returns it.
 * @function
 * @param {String} markup
 * @return {String|Null}
 */
export default function (markup) {
  if (rTranspiled.test(markup)) return null
  try {
    return markup.match(rArticle)[0]
  } catch (err) {
    return null
  }
}
