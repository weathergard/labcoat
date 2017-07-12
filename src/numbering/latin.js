'use strict'

const alphabet = ('-abcdefghijklmnopqrstuvwxyz').split('')

function latinNumbering (int) {
  return typeof int === 'number' ? alphabet[int % 26] : undefined
}

latinNumbering.class = 'latin-numbering'
latinNumbering.style = 'list-style:lower-latin;'
module.exports = latinNumbering
