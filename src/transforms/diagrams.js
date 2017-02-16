import romanNumeral from '../numbering/roman'
import latinNumeral from '../numbering/latin'

let rDiagram = /<diagram\s*?([^>]*?)\s*?>([\s\S]*?)<\/diagram\s*?>/g
  , rCaption = /<diagcaption\s*?>([\s\S]*?)<\/diagcaption\s*?>/
  , rDiag = /<diag\s*?([^>]*?)\s*?\/>/g
  , rDiagId = /<diag\s*?([^>]*?)\s*?\/>/

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

/**
 *
 * @param {} diagram
 * @param {} num
 * @function
 * @return {Function}
 */
function transpileCaption(diagram, num) {
  let diagcaption = diagram.match(rCaption)
  if (!diagcaption) return ''
  diagcaption = diagcaption[0].replace(rCaption, '$1')
  return '<figcaption><span class="figure-label">Figure&nbsp;' + num +
    '</span>&nbsp;' + diagcaption + '</figcaption>'
}

function getDiagramNumberById(diagrams, id) {
  let number = '?'
  diagrams.forEach((diagram) => {
    if (diagram.id === id) {
      number = diagram.number.toString()
    }
  })
  return number
}

function transpileDiagrams(markup) {
  const numbering = numerals(markup || '')
  let diagrams = markup.match(rDiagram) || []
  diagrams = diagrams.map((diagram, i) => ({
    index: i,
    markup: diagram,
    number: numbering(i + 1),
    id: diagram.replace(rDiagram, '$1').replace(/\s/g, '')
  }))
  diagrams.forEach(diagram => {
    const caption = transpileCaption(diagram.markup, diagram.number)
    const inner = diagram.markup.replace(rDiagram, '$2').replace(rCaption, caption)
    const figure = '<figure id="figure-' + diagram.number + '">' + inner + '</figure>'
    markup = markup.replace(diagram.markup, figure)
  })
  return {markup, model: diagrams}
}

function transpileDiags(markup, diagrams) {
  let diags = markup.match(rDiag) || []
  diags = diags.map((diag) => {
    return {
      id: diag.replace(rDiagId, '$1').replace(/\s/g, ''),
      markup: diag
    }
  })
  diags.forEach((diag) => {
    let number = getDiagramNumberById(diagrams, diag.id)
      , intext = '<a class="figure-reference" href="#figure-' + number + '">' + number + '</a>'
    markup = markup.replace(diag.markup, intext)
  })
  return markup
}

/**
 * Finds and transpiles the <diagram>, <diagcaption>, and <diag /> elements.
 * @function
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  let diagramsDone = transpileDiagrams(markup)
  return transpileDiags(diagramsDone.markup, diagramsDone.model)
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
