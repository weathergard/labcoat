'use strict'

/**
 * Sorts citation objects by lastname, authors, or title.
 * @param {Object} a
 * @param {Object} b
 * @note The default order is order of appearance in the text. Here, we change
 * that to alphabetical order.
 */
exports.alphabetical = function(a, b) {
  if (a.author) a = a.author[0].toLowerCase()
  else if (a.title) a = a.title[0].toLowerCase()
  if (b.author) b = b.author[0].toLowerCase()
  else if (b.title) b = b.title[0].toLowerCase()
  if (a === b) return 0
  if ([a, b].sort()[0] === a) return -1
  return 1
}

exports.appearance = _=>0
