import * as registry from '../registry'
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
 * Retrieves the <bibliography> tag attribute to get the citation render
 * functions from the registry.
 * @function
 * @param {String} markup
 * @return {Object}
 * @note Missing render functions individiually default to basic-style.
 */
function getRenderers(markup) {
  let style = (
    markup
      .match(rBib)
      .shift()
      .replace(rBib, '$1') || 'basic'
  )
  let basic = registry.get('styles', 'basic')
  if (style === 'basic') {
    return basic
  } else {
    let rndr = registry.get('styles', style) || {}
    if (!rndr.inText) rndr.inText = basic.inText
    if (!rndr.full) rndr.full = basic.full
    if (!rndr.order) rndr.order = function () {return 0}
    return rndr
  }
}

/**
 * Finds and transpiles the <citation> and <bibliography /> elements.
 * @function
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  let matches = markup.match(rCitation)
  if (!matches) return markup
  let bib = getBibData(markup)
  let rndr = getRenderers(markup)
  let refs = matches.map((element) => {
    let id = element.replace(rCitation, '$1')
    let source = bib[id] || {id: id}
    markup = markup.replace(element, rndr.inText(source))
    return source
  })
  refs = refs.filter((item, index) => {
    return refs.indexOf(item) === index
  })
  let li = (
    refs
      .sort(rndr.order)
      .map(source => rndr.full(source))
  )
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
