import romanNumeral from '../numbering/roman'
import latinNumeral from '../numbering/latin'

let rEndNote = /<endnote[^>]*?>[\s\S]*?<\/endnote\s*?>/g
let rEndNotes = /<endnotes\s([^>]*?)\s*?\/>/

/**
 * Determines what kind of numbering is in use.
 * @function
 * @param {String} markup
 * @return {Function}
 */
function numerals(markup) {
  let matches = markup.match(rEndNotes)
  if (matches) {
    let num = matches[0].replace(rEndNotes, '$1')
    if (num === 'latin') return latinNumeral
    if (num === 'roman') return romanNumeral
  }
  return function (int) {return int.toString()}
}

/**
 * Finds and transpiles the <endnote> and <endnotes /> elements.
 * @function
 * @param {String} markup - a document or fragment
 * @return {String}
 */
export default function (markup) {
  let notes = markup.match(rEndNote) || []
  let numbering = numerals(markup)
  notes.forEach((note, index) => {
    let num = numbering(index + 1)
    let ref = `<sup><a id="intext-note-${num}" href="#note-${num}">${num}</a></sup>`
    markup = markup.replace(note, ref)
  })
  let li = notes
    .map((note) => {
      return note.replace(/<\/?endnote>/g, '')
    })
    .map((note, index) => {
      let num = numbering(index + 1)
      return `<li><a id="note-${num}" href="#intext-note-${num}">${note}</a></li>`
    })
  let footer = `<section class="notes"><ol class="notes-list">${li.join('')}</ol></section>`
  markup = markup.replace(rEndNotes, footer)
  return markup
}
