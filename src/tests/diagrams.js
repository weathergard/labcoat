const assert = require('assert')
const diagrams = require('../transforms/diagrams')

const GOOD_HTML = [
  [ // No ID
    '<diagram></diagram>',
    '<figure id="figure-1"></figure>'
  ],
  [ // No content
    '<diagram eiffel-tower></diagram>',
    '<figure id="figure-1"></figure>'
  ],
  [ // <img> content only
    '<diagram eiffel-tower><img src="tower.jpg"></diagram>',
    '<figure id="figure-1"><imgsrc="tower.jpg"></figure>'
  ],
  [ // <img> + empty <diagcaption>
    `<diagram eiffel-tower><img src="tower.jpg">
      <img src="tower.jpg">
      <diagcaption></diagcaption>
    </diagram>`,
    `<figure id="figure-1"><imgsrc="tower.jpg">
      <img src="tower.jpg">
      <figcaption><span class="figure-label">Figure&nbsp;1</span>&nbsp;</figcaption>
    </figure>`
  ],
  [ // <img> + <diagcaption>
    `<diagram eiffel-tower><img src="tower.jpg">
      <img src="tower.jpg">
      <diagcaption>Contents</diagcaption>
    </diagram>`,
    `<figure id="figure-1"><imgsrc="tower.jpg">
      <img src="tower.jpg">
      <figcaption><span class="figure-label">Figure&nbsp;1</span>&nbsp;Contents</figcaption>
    </figure>`
  ],
  [ // <img> + <diagcaption> + </diag>
    `<diagram eiffel-tower><img src="tower.jpg">
      <img src="tower.jpg">
      <diagcaption>Contents</diagcaption>
    </diagram>
    <diag eiffel-tower />`,
    `<figure id="figure-1"><imgsrc="tower.jpg">
      <img src="tower.jpg">
      <figcaption><span class="figure-label">Figure&nbsp;1</span>&nbsp;Contents</figcaption>
    </figure>
    <a class="figure-reference" href="#figure-1">1</a>`
  ]
]

module.exports = function () {
  GOOD_HTML.forEach((pair) => {
    assert.equal(
      diagrams(pair[0]).replace(/\s/g, ''),
      pair[1].replace(/\s/g, '')
    )
  })
  console.log('  ✔ <diagram>')
  console.log('  ✔ <diagcaption />')
  console.log('  ✔ <diag />')
}
