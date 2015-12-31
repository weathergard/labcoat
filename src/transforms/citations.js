import env from '../env'
import * as registry from '../registry'

// EXCEPTION MESSAGES ==========================================================
const INTEXT_NOT_FOUND = ''+
  'WARN: No in-text renderer was found by the specified name. Check the '+
  'attribute on the opening <bibliogrpahy> tag.'

const FULLLEN_NOT_FOUND = '' +
  'WARN: No full-length renderer was found by the specified name. Check the '+
  'attribute on the opening <bibliogrpahy> tag.'
// =============================================================================

let rBib = /<bibliography\s*([^>]*?)\s*>([\s\S]*?)<\/bibliography>/
let rCitation = /<citation\s([^>]+?)\s?\/>/g

/**
 * Turns an array into an object (keyed by <array-element>.id).
 * @function
 * @param {Array} bib
 * @return {Object}
 */
function mapBibData (bib) {
  let obj = {}
  bib.forEach((source) => {
    obj[source.id] = source
  })
  return obj
}

/**
 * Grabs an parses either embedded data or from a file or URL.
 * @function
 * @param {String} markup
 * @return {Object}
 */
function getBibData(markup) {
  let bib
  if (rBib.test(markup)) {
    bib = markup.match(rBib)[0].replace(rBib, '$2')
    try {
      bib = mapBibData(JSON.parse(bib))
    } catch (err) {
      bib = []
    }
  }
  return bib
}

/**
 * Retrieves the <bibliography> tag attribute to get the citation renderer from
 * the registry; defaults to basic-style.
 * @function
 * @param {String} markup
 * @return {Object}
 */
function getRenderers(markup) {
  let style = markup.match(rBib).shift().replace(rBib, '$1') || 'basic'
  let renderer = registry.get('styles', style) || {}
  if (!renderer.inText) {
    console.log(INTEXT_NOT_FOUND)
    renderer.inText = registry.get('styles', 'basic').inText
  }
  if (!renderer.full) {
    console.log(FULLLEN_NOT_FOUND)
    renderer.full = registry.get('styles', 'basic').full
  }
  return renderer
}

/**
 * Finds and transpiles the <citation> and <bibliography /> elements.
 * @function
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  let bib = getBibData(markup)
  let render = getRenderers(markup)
  let refs = markup.match(rCitation).map((element) => {
    let id = element.replace(rCitation, '$1')
    let source = bib[id] || {id: id}
    markup = markup.replace(element, render.inText(source))
    return source
  })
  refs = refs.filter((item, index) => {
    return refs.indexOf(item) === index
  })
  let li = refs.map(source => render.full(source))
  let bibSection = `<section id="bibliography">
      <ol class="bibliography-list">${li.join('')}
      </ol>
    </section>`
  return markup.replace(rBib, bibSection)
}

export default function (markup) {
  try {
    return transpile(markup)
  } catch (err) {
    return (
      markup +
      '\n<!-- '+
      'Labcoat transpilation failed for <citation> and <bibliography /> '+
      'elements. '+
      '\n' + err.stack + '\n'+
      ' -->'
    )
  }
}
