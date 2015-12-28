import assert from 'assert'
import endnote from '../transforms/endnotes'
const HTML = [
  [
    '<endnote></endnote>',
    '<sup><a id="intext-note-1" href="#note-1">1</a></sup>'
  ],
  [
    '<endnote ></endnote>',
    '<sup><a id="intext-note-1" href="#note-1">1</a></sup>'
  ],
  [
    '<endnote></endnote >',
    '<sup><a id="intext-note-1" href="#note-1">1</a></sup>'
  ],
  [
    '<endnote>Contents</endnote>',
    '<sup><a id="intext-note-1" href="#note-1">1</a></sup>'
  ],
  [
    '<endnotes />',
    '<section class="notes"><ol class="notes-list"></ol></section>'
  ],
  [
    '<endnote>Contents</endnote><endnotes />',
    '<sup><a id="intext-note-1" href="#note-1">1</a></sup>'+
    '<section class="notes">'+
      '<ol class="notes-list">'+
        '<li><a id="note-1" href="#intext-note-1">Contents</a></li>'+
      '</ol>'+
    '</section>'
  ],
  [
    '<endnote>Contents</endnote><endnotes roman />',
    '<sup><a id="intext-note-i" href="#note-i">i</a></sup>'+
    '<section class="notes">'+
      '<ol class="notes-list">'+
        '<li><a id="note-i" href="#intext-note-i">Contents</a></li>'+
      '</ol>'+
    '</section>'
  ],
  [
    '<endnote>Contents</endnote><endnotes latin />',
    '<sup><a id="intext-note-a" href="#note-a">a</a></sup>'+
    '<section class="notes">'+
      '<ol class="notes-list">'+
        '<li><a id="note-a" href="#intext-note-a">Contents</a></li>'+
      '</ol>'+
    '</section>'
  ]
]

export default function () {
  HTML.forEach((pair) => {
    assert.equal(
      endnote(pair[0]).replace(/\s/g, ''),
      pair[1].replace(/\s/g, '')
    )
  })
  console.log('  ✔ <endnote>')
  console.log('  ✔ <endnotes />')
}
