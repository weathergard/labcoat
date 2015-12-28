import article from './transforms/article'
import diagrams from './transforms/diagrams'
import endnotes from './transforms/endnotes'
import citations from './transforms/citations'
import idempotentiate from './transforms/idempotentiate'

export default function (markup) {
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
