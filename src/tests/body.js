const assert = require('assert')
const body = require('../transforms/body')

const HTML = [
  '<main></main>',
  '<main ></main>',
  '<main></main >',
  '<main id="id-string" class="class-name" data-attr-here data-other="data-string"></main>',
  '<main data-tricky="<yo>"></main>'
]

module.exports = function () {
  HTML.forEach((markup) => {
    assert.equal(body(markup), markup)
  })
  console.log('  ✔ <body>')
}
