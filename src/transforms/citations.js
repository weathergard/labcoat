let rBib = /<bibliography([^>]*?)>([\s\S]*?)<\/bibliography>/
let rCitation = /<citation\s([^>]+?)\s?\/>/g

function mapBibData (bib) {
  let obj = {}
  bib.forEach((source) => {
    obj[source.id] = source
  })
  return obj
}

/**
 * Finds and transpiles the <citation> and <bibliography /> elements.
 * @function
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  let bib
  if (rBib.test(markup)) {
    bib = markup.match(rBib)[0].replace(rBib, '$2')
    try {
      bib = mapBibData(JSON.parse(bib))
    } catch (err) {
      bib = []
    }
  }
  let refs = markup.match(rCitation).map((element) => {
    let id = element.replace(rCitation, '$1')
    let source = bib[id] || {}
    markup = markup.replace(
      element,
      `<cite><a href="#${id}">${source.author}, ${source.year}</a></cite>`
    )
    return source
  })
  refs = refs.filter((item, index) => {
    return refs.indexOf(item) === index
  })
  let li = refs.map((source) => {
    return (`
        <li id="${source.id}">
          ${source.author}, ${source.year}. "${source.title}".
          <a href="${source.url}">${source.url}</a>.
          Accessed: ${source.accessed}.</li>`
    )
  })
  let bibSection = `<section id="bibliography">
      <ol>${li.join('')}
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
