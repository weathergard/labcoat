const assert = require('assert')
const endnote = require('../transforms/endnotes')
const HTML = [
  [
    '<endnote></endnote>',
    '<sup><a id="intext-note-1" href="#endnote-1">1</a></sup>'
  ],
  [
    '<endnote ></endnote>',
    '<sup><a id="intext-note-1" href="#endnote-1">1</a></sup>'
  ],
  [
    '<endnote></endnote >',
    '<sup><a id="intext-note-1" href="#endnote-1">1</a></sup>'
  ],
  [
    '<endnote>Contents</endnote>',
    '<sup><a id="intext-note-1" href="#endnote-1">1</a></sup>'
  ],
  [
    '<endnotes />',
    '<section class="endnotes"><ol class="endnotes-list" style=""></ol></section>'
  ],
  [
    '<endnote>Contents</endnote><endnotes/>',
    '<sup><a id="intext-note-1" href="#endnote-1">1</a></sup>'+
    '<section class="endnotes">'+
      '<ol class="endnotes-list" style="">'+
        '<li><a id="endnote-1" href="#intext-note-1">Contents</a></li>'+
      '</ol>'+
    '</section>'
  ],
  [
    '<endnote>Contents</endnote><endnotes roman />',
    '<sup><a id="intext-note-i" href="#endnote-i">i</a></sup>'+
    '<section class="endnotes">'+
      '<ol class="endnotes-list roman-numbering" style="list-style:lower-roman;">'+
        '<li><a id="endnote-i" href="#intext-note-i">Contents</a></li>'+
      '</ol>'+
    '</section>'
  ],
  [
    '<endnote>Contents</endnote><endnotes latin />',
    '<sup><a id="intext-note-a" href="#endnote-a">a</a></sup>'+
    '<section class="endnotes">'+
      '<ol class="endnotes-list latin-numbering" style="list-style:lower-latin;">'+
        '<li><a id="endnote-a" href="#intext-note-a">Contents</a></li>'+
      '</ol>'+
    '</section>'
  ]
]

module.exports = function () {
  HTML.forEach((pair) => {
    assert.equal(
      endnote(pair[0]).replace(/\s/g, ''),
      pair[1].replace(/\s/g, '')
    )
  })
  console.log('  ✔ <endnote>')
  console.log('  ✔ <endnotes />')
}
