import romanNumeral from '../numbering/roman'
import latinNumeral from '../numbering/latin'

let rDiagram = /<diagram\s*?([^>]*?)\s*?>([\s\S]*?)<\/diagram\s*?>/g
let rCaption = /<diagcaption\s*?>([\s\S]*?)<\/diagcaption\s*?>/
let rDiag = /<diag\s*?([^>]*?)\s*?\/>/g
let rDiagId = /<diag\s*?([^>]*?)\s*?\/>/

/**
 * Determines what kind of numbering is in use.
 * @function
 * @param {String} markup
 * @return {Function}
 */
function numerals(markup) {
  if (/latin-diagrams/.test(markup)) return latinNumeral
  if (/roman-diagrams/.test(markup)) return romanNumeral
  return function (int) {return int.toString()}
}

function transpileCaption(diagram, num) {
  let diagcaption = diagram.match(rCaption)
  if (!diagcaption) return ''
  diagcaption = diagcaption[0].replace(rCaption, '$1')
  return '<figcaption><span class="figure-label">Figure&nbsp;' + num +
    '</span>&nbsp;' + diagcaption + '</figcaption>'
}

/**
 * Finds and transpiles the <diagram>, <diagcaption>, and <diag /> elements.
 * @function
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  let matches = markup.match(rDiagram)
  if (!matches) return markup
  let indices = {}
  let numbering = numerals(markup)
  matches.forEach((diagram, index) => {
    let ident = diagram.match(rDiagram)
    if (!ident || !ident[0].length) return markup
    ident = ident[0].replace(rDiagram, '$1')
    indices[ident] = index + 1
    let num = numbering(index + 1)
    let caption = transpileCaption(diagram, num)
    let inner = diagram.replace(rDiagram, '$2').replace(rCaption, caption)
    let figure = '<figure id="figure-' + num + '">' + inner + '</figure>'
    markup = markup.replace(diagram, figure)
  })

  let refs = (markup.match(rDiag) || []).forEach((ref) => {
    let ident = ref.match(rDiagId)[0].replace(rDiagId, '$1')
    let num = numbering(indices[ident])
    let intext = '<a class="figure-reference" href="#figure-' + num + '">' + num + '</a>'
    markup = markup.replace(ref, intext)
  })
  return markup
}

export default function (markup) {
  try {
    return transpile(markup)
  } catch (err) {
    return (
      markup +
      '\n<!-- '+
      'Labcoat transpilation failed for <diagram>, <diagcaption>, and <diag /> '+
      'elements. '+
      '\n' + err.stack + '\n'+
      ' -->'
    )
  }
}
