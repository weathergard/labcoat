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
function transpile(markup) {
  let notes = markup.match(rEndNote) || []
  let numbering = numerals(markup)
  notes.forEach((note, index) => {
    let num = numbering(index + 1)
    let ref = `<sup><a id="intext-note-${num}" href="#endnote-${num}">${num}</a></sup>`
    markup = markup.replace(note, ref)
  })
  let li = notes
    .map((note) => {
      return note.replace(/<\/?endnote>/g, '')
    })
    .map((note, index) => {
      let num = numbering(index + 1)
      return `<li><a id="endnote-${num}" href="#intext-note-${num}">${note}</a></li>`
    })
  let footer = `<section class="endnotes"><ol class="endnotes-list">${li.join('')}</ol></section>`
  markup = markup.replace(rEndNotes, footer)
  return markup
}

export default function (markup) {
  try {
    return transpile(markup)
  } catch (err) {
    return (
      markup +
      '\n<!-- '+
      'Labcoat transpilation failed for <endnote> and <endnotes /> '+
      'elements. '+
      '\n' + err.stack + '\n'+
      ' -->'
    )
  }
}
