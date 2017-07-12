'use strict'

const registry = require('./registry')
const apa = require('./styles/apa')
const mla = require('./styles/mla')
const orders = require('./styles/orders')
const body = require('./transforms/body')
const diagrams = require('./transforms/diagrams')
const endnotes = require('./transforms/endnotes')
const citations = require('./transforms/citations')
const idempotentiate = require('./transforms/idempotentiate')

/**
 * Transpiles input markup to HTML.
 * @param {String} markup
 * @return {String}
 */
function transpiler (markup) {
  if (!markup) return markup
  let content = body(markup)
  if (typeof content !== 'string' || !content) return markup
  return markup.replace(
    content,
    idempotentiate(diagrams(citations(endnotes(content.replace(/\s+/g, ' ')))))
  )
}

/**
 * Registers a citation style.
 * @param {String} name
 * @param {Object} style
 * @return {undefined}
 */
transpiler.style = style => {
  if (!style) return
  if (!style.name) throw new Error('Styles must be registered with a name.')
  if (style.extends) {
    const extended = registry.get('styles', style.extends)
    if (!extended) throw new Error(style.extends + ' does not exist.')
    delete extended.name
    Object.keys(style.full).forEach(type => extended[type] = style.full[type])
    if (style.inText) extended.inText = style.inText
    if (style.order) extended.order = orders[style.order]
    registry.set('styles', style.name, extended)
  } else {
    registry.set('styles', style.name, {
      inText: style.inText,
      full: style.full,
      order: orders[style.order]
    })
  }
}

transpiler.style(apa)
transpiler.style(mla)
module.exports = transpiler

/**
 * Transpiles body.innerHTML if not in node.js.
 * @return {undefined}
 */
;(_=> {
  if (typeof module !== 'undefined' && module.exports) return
  document.addEventListener('DOMContentLoaded', function () {
    const transpiled = transpiler(document.body.innerHTML)
    if (transpiled !== document.body.innerHTML) {
      document.body.innerHTML = transpiled
    }
  })
})()
