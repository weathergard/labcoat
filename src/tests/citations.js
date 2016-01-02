import assert from 'assert'
import citations from '../transforms/citations'

const DOE84 = JSON.stringify({
  "id": "doe84",
  "firstname": "Jon",
  "lastname": "Doe",
  "authors": null,
  "year": 1984,
  "title": "The title",
  "url": "http://uni.edu/chem/jones/doc.pdf",
  "accessed": "25-6-2015"
})

const GOOD_HTML = [
  [ // Data undefined (should still transpile).
    '<citation doe84 /><bibliography></bibliography>',
    '<cite><a href="#doe84"></a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84"></li>'+
      '</ol>'+
    '</section>'
  ],
  [ // Data empty (should still transpile).
    '<citation doe84 /><bibliography>[]</bibliography>',
    '<cite><a href="#doe84"></a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84"></li>'+
      '</ol>'+
    '</section>'
  ],
  [ // Working case.
    '<citation doe84 />'+
    '<bibliography>['+ DOE84 +']</bibliography>',
    '<cite><a href="#doe84">Doe, 1984</a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84">'+
          'Doe, Jon. 1984. "The title".'+
          '<a href="http://uni.edu/chem/jones/doc.pdf">http://uni.edu/chem/jones/doc.pdf</a>.'+
          'Accessed: 25-6-2015.</li>'+
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
