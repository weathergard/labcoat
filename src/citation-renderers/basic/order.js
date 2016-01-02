/**
 * Sorts citation objects by lastname, authors, or title.
 * @param {Object} a
 * @param {Object} b
 * @note The default order is order of appearance in the text. Here, we change
 * that to alphabetical order.
 */
export default function (a, b) {
  if (a.lastname) a = a.lastname[0].toLowerCase()
  else if (a.authors) a = a.authors[0].toLowerCase()
  else if (a.title) a = a.title[0].toLowerCase()

  if (b.lastname) b = b.lastname[0].toLowerCase()
  else if (b.authors) b = b.author[0].toLowerCase()
  else if (b.title) b = b.title[0].toLowerCase()

  if (a === b) return 0
  if ([a, b].sort()[0] === a) return -1
  return 1
}
