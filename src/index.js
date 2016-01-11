import * as registry from './registry'
import apa from './styles/apa'
import mla from './styles/mla'
import * as orders from './styles/orders'
import body from './transforms/body'
import diagrams from './transforms/diagrams'
import endnotes from './transforms/endnotes'
import citations from './transforms/citations'
import idempotentiate from './transforms/idempotentiate'

/**
 * Transpiles input markup to HTML.
 * @function
 * @param {String} markup
 * @return {String}
 */
function transpiler (markup) {
  if (!markup) return markup
  let content = body(markup)
  if (!content) return markup
  return (
    markup.replace(content,
      idempotentiate(
        diagrams(
          citations(
            endnotes(
              content
            )
          )
        )
      )
    )
  )
}

/**
 * Registers a citation style.
 * @function
 * @param {String} name
 * @param {Object} style
 * @return {}
 */
transpiler.style = function (style) {
  if (!style) return
  if (!style.name) throw new Error('Styles must be registered with a name.')
  if (style.extends) {
    let extended = registry.get('styles', style.extends)
    if (!extended) throw new Error(style.extends + ' does not exist.')
    delete extended.name
    Object.keys(style.full).forEach(function (type) {
      extended[type] = style.full[type]
    })
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
export default transpiler
