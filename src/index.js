import * as registry from './registry'
import article from './transforms/article'
import diagrams from './transforms/diagrams'
import endnotes from './transforms/endnotes'
import citations from './transforms/citations'
import idempotentiate from './transforms/idempotentiate'
import * as basic from './citation-renderers/basic'

/**
 * Transpiles input markup to HTML.
 * @function
 * @param {String} markup
 * @return {String}
 */
function transpiler (markup) {
  let content = article(markup)
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
transpiler.style = function (name, style) {
  registry.set('styles', name, {
    inText: style.inText,
    full: style.full,
    order: style.order
  })
}

transpiler.style('basic', basic)
export default transpiler
