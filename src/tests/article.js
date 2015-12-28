import assert from 'assert'
import article from '../transforms/article'

const HTML = [
  '<article></article>',
  '<article ></article>',
  '<article></article >',
  '<article id="id-string" class="class-name" data-attr-here data-other="data-string"></article>',
  '<article data-tricky="<yo>"></article>'
]

export default function () {
  HTML.forEach((markup) => {
    assert.equal(article(markup), markup)
  })
  console.log('  ✔ <article>')
}
