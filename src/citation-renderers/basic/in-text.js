/**
 * Creates a formatted in-text source citation.
 * @function
 * @param {Object} source
 * @return {String}
 */
export default function inText (source) {
  let output = '<cite class="in-text-citation">'
  if (source.id) {
    output += `<a href="#${source.id}">`
  } else {
    output += '<a>'
  }
  if (source.authors && source.year) { // Author or title
    output += `${source.authors} ${source.year}`
  } else if (source.lastname && source.year) {
    output += `${source.lastname} ${source.year}`
  } else if (source.title && source.year) {
    output += `"${source.title}" ${source.year}`
  }
  return output + '</a></cite>'
}
