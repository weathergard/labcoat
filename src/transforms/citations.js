import * as registry from '../registry'
import citeFormat from 'cite-format'

let rBib = /<bibliography\s*([^>]*?)\s*>([\s\S]*?)<\/bibliography\s?>/
let rCitation = /<citation\s([^>]+?)\s?\/>/g

function duckType(source) {
  if (!source.type) source.type = 'book'
}

function full(source, style) {
  duckType(source)
  let format = style.full[source.type]
  try {
    return '<li id="' + source.id + '">' + citeFormat(source, format) + '</li>'
  } catch (err) {
    return '\n<!-- Failed to interpolate citation ' + source.id + '. \n' + err.stack + '\n -->\n'
  }
}

function inText(source, style) {
  try {
    return ''+
      '<cite class="in-text-citation">'+
        '<a href="#' + source.id + '">' + citeFormat(source, style.inText) + '</a>'+
      '</cite>'
  } catch (err) {
    return '\n<!-- Failed to interpolate citation ' + source.id + '. \n' + err.stack + '\n -->\n'
  }
}


/**
 * Turns an array into an object (keyed by <array-element>.id).
 * @function
 * @param {Array} bib
 * @return {Object}
 */
function mapBibData (bib) {
  let obj = {}
  bib.forEach((source, index) => {
    if ('id' in source) obj[source.id] = source
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
    , output = []

  if (rBib.test(markup)) {
    bib = (
      markup
        .match(rBib)[0]
        .replace(rBib, '$2')
        .replace(/(^\s*\[)|(\]\s*$)/g, '')
        .replace(/({|,)\s*([A-z0-9_-]+):/g, '$1"$2":') // <- Add prop name quotes.
        .replace(/,\s*}/g, '}') // <-- Remove bad trailing commas.
    )
    if (!bib) return output
    bib.split(/}\s*,\s*{/g).forEach((record) => {
      if (!/^\s*{/.test(record)) record = '{' + record
      if (!/}\s*$/.test(record)) record += '}'
      try {
        output.push(JSON.parse(record))
      } catch (err) {
        output.push({
          input: record,
          err: err
        })
      }
    })
    console.log(output)
    output = mapBibData(output)
  }
  return output
}


/**
 * Retrieves the <bibliography> tag attribute to get the citation render
 * functions from the registry.
 * @function
 * @param {String} markup
 * @return {Object}
 * @note Missing render functions individiually default to basic-style.
 */
function getStyle(markup) {
  let style = (
    markup
      .match(rBib)
      .shift()
      .replace(rBib, '$1') || 'apa'
  )
  return registry.get('styles', style)
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
  let style = getStyle(markup)
  let refs = matches.map((element) => {
    let id = element.replace(rCitation, '$1')
    let source = bib[id] || {id: id}
    markup = markup.replace(element, inText(source, style))
    return source
  })
  refs = refs.filter((item, index) => {
    return refs.indexOf(item) === index
  })
  let li = (
    refs
      .sort(style.order)
      .map(source => full(source, style))
  )
  let bibSection = '<section id="bibliography"><ol class="bibliography-list">' + li.join('') + '</ol></section>'
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
