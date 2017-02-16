import romanNumeral from '../numbering/roman'
import latinNumeral from '../numbering/latin'

const rEndNote = /<endnote[^>]*?>[\s\S]*?<\/endnote\s*?>/g
const rEndNotes = /<endnotes\s?([^>]*?)\s*?\/>/

/**
 * Determines what kind of numbering is in use.
 * @param {String} markup
 * @return {Function}
 */
function numerals(markup) {
  const matches = markup.match(rEndNotes)
  if (matches) {
    let num = matches[0].replace(rEndNotes, '$1')
    if (num === 'latin') return latinNumeral
    if (num === 'roman') return romanNumeral
  }
  return function (int) {return int.toString()}
}

/**
 * Finds and transpiles the <endnote> and <endnotes /> elements.
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  const notes = markup.match(rEndNote) || []
  const numbering = numerals(markup)
  notes.forEach((note, index) => {
    let num = numbering(index + 1)
    let ref = `<sup><a id="intext-note-${num}" href="#endnote-${num}">${num}</a></sup>`
    markup = markup.replace(note, ref)
  })
  const li = notes
    .map(note => note.replace(/<\/?endnote\s*>/g, ''))
    .map((note, i) => {
      const num = numbering(i + 1)
      return `<li><a id="endnote-${num}" href="#intext-note-${num}">${note}</a></li>`
    })
  const footer = (`
    <section class="endnotes">
      <ol
        class="endnotes-list ${numbering.class || ''}"
        style="${numbering.style|| ''}">
          ${li.join('')}
      </ol>
    </section>
  `)
  return markup.replace(rEndNotes, footer)
}

export default function (markup) {
  try {
    return transpile(markup)
  } catch (err) {
    return (
      markup +
      '\n<!-- '+
      'Labcoat transpilation failed for <endnote> and <endnotes /> elements. '+
      '\n' + err.stack + '\n'+
      ' -->'
    )
  }
}
