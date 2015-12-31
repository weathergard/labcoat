import * as registry from './registry'
import article from './transforms/article'
import diagrams from './transforms/diagrams'
import endnotes from './transforms/endnotes'
import citations from './transforms/citations'
import idempotentiate from './transforms/idempotentiate'
import * as basic from './citation-renderers/basic'

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

transpiler.style = function (name, inText, full) {
  registry.set('styles', name, {
    inText: inText,
    full: full
  })
}

// Register core citation styles
transpiler.style('basic', basic.inText, basic.full)

export default transpiler
