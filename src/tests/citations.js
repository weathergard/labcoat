import assert from 'assert'
import citations from '../transforms/citations'

const GOOD_HTML = [
  [ // Data undefined (should still transpile).
    '<citation doe84 /><bibliography></bibliography>',
    '<cite class="in-text-citation"><a href="#doe84"></a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84"></li>'+
      '</ol>'+
    '</section>'
  ]
]

export default function () {
  GOOD_HTML.forEach((pair) => {
    assert.equal(
      citations(pair[0]).replace(/\s/g, ''),
      pair[1].replace(/\s/g, '')
    )
  })
  console.log('  ✔ <citation />')
  console.log('  ✔ <bibliography>')
}
