const assert = require('assert')
const citations = require('../../transforms/citations')

const DOE84_1 = JSON.stringify({
  id: "doe84"
})

const DOE84_2 = JSON.stringify({
  id: "doe84",
  author: "Doe, Jon"
})

const DOE84_3 = JSON.stringify({
  id: "doe84",
  author: "Doe, Jon",
  year: 1984
})

const DOE84_4 = JSON.stringify({
  id: "doe84",
  author: "Doe, Jon",
  authors: null,
  year: 1984,
  title: "The title"
})

const DOE84_5 = JSON.stringify({
  id: "doe84",
  author: "Doe, Jon",
  authors: null,
  year: 1984,
  title: "The title",
  publisher: "MIT Press",
  location: "Cambridge, MA"
})

const DOE84_6 = JSON.stringify({
  id: "doe84",
  author: "Doe, Jon",
  authors: null,
  year: 1984,
  title: "The title",
  publisher: "MIT Press",
  location: "Cambridge, MA",
  edition: "3rd",
  editor: "Doe, Jane and Smith, Henry"
})

const DOE84_7 = JSON.stringify({
  id: "doe84",
  author: "Doe, Jon",
  authors: null,
  year: 1984,
  title: "The title",
  publisher: "MIT Press",
  location: "Cambridge, MA",
  edition: "3rd",
  editor: "Doe, Jane and Smith, Henry",
  translator: "Jones, Tom and Baker, Harry"
})


const HTML = [
  {
    test: 'id',
    bib: DOE84_1,
    output: '<cite class="in-text-citation"><a href="#doe84"></a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84"></li>'+
      '</ol>'+
    '</section>',
  },
  {
    test: 'author',
    bib: DOE84_2,
    output: '<cite class="in-text-citation"><a href="#doe84">Doe</a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84">Doe, Jon.</li>'+
      '</ol>'+
    '</section>',
  },
  {
    test: 'year',
    bib: DOE84_3,
    output: '<cite class="in-text-citation"><a href="#doe84">Doe 1984</a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84">Doe, Jon. (1984).</li>'+
      '</ol>'+
    '</section>',
  },
  {
    test: 'title',
    bib: DOE84_4,
    output: '<cite class="in-text-citation"><a href="#doe84">Doe 1984</a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84">Doe, Jon. (1984). <i>The title</i>.</li>'+
      '</ol>'+
    '</section>',
  },
  {
    test: 'publisher, location',
    bib: DOE84_5,
    output: '<cite class="in-text-citation"><a href="#doe84">Doe 1984</a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84">Doe, Jon. (1984). <i>The title</i>. Cambridge, MA: MIT Press.</li>'+
      '</ol>'+
    '</section>',
  },
  {
    test: 'edition, editor',
    bib: DOE84_6,
    output: '<cite class="in-text-citation"><a href="#doe84">Doe 1984</a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84">Doe, Jon. (1984). <i>The title</i> (3rd ed.). Jane Doe &amp; Henry Smith (Ed(s).). Cambridge, MA: MIT Press.</li>'+
      '</ol>'+
    '</section>',
  },
  {
    test: 'translator',
    bib: DOE84_7,
    output: '<cite class="in-text-citation"><a href="#doe84">Doe 1984</a></cite>'+
    '<section id="bibliography">'+
      '<ol class="bibliography-list">'+
        '<li id="doe84">Doe, Jon. (1984). <i>The title</i> '+
        '(Harry Baker &amp; Tom Jones, Trans.), (3rd ed.).'+
        'Jane Doe &amp; Henry Smith (Ed(s).). Cambridge, MA: MIT Press.</li>'+
      '</ol>'+
    '</section>',
  }
]

module.exports = function () {
  console.log('\n  APA citations tests:')
  HTML.forEach((pair, index) => {
    let input = (
      '<citation doe84 />'+
      '<bibliography>['+ pair.bib +']</bibliography>'
    )
    let actual = citations(input).replace(/\s/g, '')
    let desired = pair.output.replace(/\s/g, '')
    if (actual !== desired) {
      console.log('DESIRED\n' + desired + '\n')
      console.log('ACTUAL\n' + actual + '\n')
    }
    assert.equal(actual, desired)
    console.log('    ✔ ' + pair.test)
  })
  console.log('')
}
