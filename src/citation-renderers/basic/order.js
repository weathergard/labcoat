/**
 * Sorts citation objects by lastname, authors, or title.
 * @param {Object} a
 * @param {Object} b
 * @note The default order is order of appearance in the text. Here, we change
 * that to alphabetical order.
 */
export default function (a, b) {
  let aChar = (
    a.lastname[0].toLowerCase() ||
    a.authors[0].toLowerCase() ||
    a.title[0].toLowerCase()
  )
  let bChar = (
    b.lastname[0].toLowerCase() ||
    b.authors[0].toLowerCase() ||
    b.title[0].toLowerCase()
  )
  if (aChar === bChar) return 0
  if ([aChar, bChar].sort()[0] === aChar) return -1
  return 1
}
