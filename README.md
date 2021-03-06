# Labcoat
Enhance HTML with scholarly bibliographic and annotation features.

## Use it anywhere.
Labcoat is a *fast,* idempotent, side-effect-free, pure function. Its output is valid HTML5. You can use it:

1. in Node.js: `res.end(labcoat(html))`
1. in the browser: `document.body.innerHTML = labcoat(document.body.innerHTML)`

## Prefatory comment on performance
Labcoat doesn't parse HTML, find, and then manipulate elements. It transforms one markup string into another, ignoring all but a narrowly specified set of labcoat elements (of which, more in due course). The remaining material is a subregular cousin of HTML, parsing of which is virtually instant.

**Benchmark:** Given a 5kb document making heavy use of labcoat features, with both latin and roman numbering, and APA citations, transpilation takes &approx;1 millisecond on a 2.2ghz Core i7 (node 5.x).

<hr>

## Install it.
`npm install labcoat`

## &lt;endnote> and &lt;endnotes />
Use the `<endnote>` element to get reciprocally-linked end notes. Use the companion self-closing `<endnotes />` element to indicate where you want the notes to appear in the transpiled HTML.

```html
<p>Body text.<endnote>a note</endnote></p>
<endnotes />
```
#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<p>Body text.<sup><a id="intext-note-1" href="#endnote-1">1</a></sup></p>
<section id="endnotes">
  <ol class="endnotes-list">
    <li id="endnote-1"><a href="#intext-note-1">a note</a></li>
  </ol>
</section>
```

#### Numbering style
Default numbering style is plain integers; provide either a `latin` or `roman` attribute, as follows: `<endnotes latin />`. Then, set the `list-style` CSS property on `ol.endnotes-list` to match.

## &lt;citation /> and &lt;bibliography />
The `<citation>` element and the companion `<bibliography>` element allow the creation of linked in-text citations and a full-length, alphabetized bibliography section.

```html
<p>Body text (<citation chomsky93 />).</p>
<bibliography>

  { id:         'chomsky93',
    firstname:  'Noam',
    lastname:   'Chomsky',
    year:       1993,
    title:      'The Minimalist Program',
    publisher:  'MIT Press' }

  { &hellip; another source }

</bibliography>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<p>Body text (<cite><a href="#chomsky93">Chomsky 1993</a></cite>).</p>
<section id="bibliography">
  <ol class="bibliography-list">
    <li id="chomsky93">
      Chomsky, Noam. (1993). The Minimalist Program. MIT Press.
    </li>
  </ol>
</section>
```

The bibliography data format is JSON minus some of the annoying strictness of JSON (i.e., a superset of JSON). There's no need to enclose property names in quotes unless they contain symbols. There's no need to represent multiple sources as elements of an array. But strict JSON is fine, too.

### MLA & APA citation styles
Labcoat includes an implementation of both APA and MLA citation standards for the following types of resources:

* books and anthologies
* book chapters
* journal articles
* conference proceedings
* webpages
* newspaper articles
* magazine articles
* lectures
* films
* radio/TV broadcasts

You can specify which style you want to use (APA is default) on the `<bibliography>` tag:

```html
<bibliography mla>
```

### Custom citation styles
You can easily define custom citation styles, or extend an existing style, with [cite formats](https://github.com/jeffmcmahan/cite-format). Here's a basic one for a book:

```
AUTHOR. (YEAR). <i>TITLE</i>. LOCATION: PUBLISHER.
```

Examine the included [APA](/src/styles/apa) and [MLA](/src/styles/mla) styles to see a variety of real-life examples.

```js
// new-style.js
export default {
  name: 'new-style',
  extends: 'apa',
  order: 'alphabetical',
  inText: <cite-format>,
  full: {
    myNewType:   <cite-format>,
    webpage:     <cite-format>,
    newspaper:   <cite-format>,
    book:        <cite-format>,
    editedBook:  <cite-format>,
    anthology:   <cite-format>,
    bookChapter: <cite-format>,
    magazine:    <cite-format>,
    journal:     <cite-format>,
    conference:  <cite-format>,
    film:        <cite-format>,
    broadcast:   <cite-format>
  }
}
```

Register a custom style as follows:
```js
import labcoat from 'labcoat'
import newStyle from './new-style'

labcoat.style(newStyle)
```

And use it in your HTML:

```html
<bibliography new-style>
```

## &lt;diagram> + &lt;diagcaption> and &lt;diag />
Labcoat uses `<diagram>` and `<diagcaption>` elements to create organized `<figure>` and `<figcaption>` elements; these will be automatically labeled, numbered, and ID'ed. Use the self-closing `<diag />` element to create in-text references to your diagrams, as shown here:

```html
<diagram taj-mahal>
  <img src="taj-mahal.jpg">
  <diagcaption>the caption</diagcaption>
</diagram>
<p>And here we see <diag taj-mahal />.</p>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<figure class="diagram" id="figure-1" title="taj-mahal">
  <img src="taj-mahal.jpg">
  <figcaption>
    <span class="figure-label">Figure 1</span> the caption
  </figcpation>
</figure>
<p>And here we see <a class="figure-reference" href="#figure-1">Figure 1<a>.</p>
```

#### Numbering style options
The default numbering style is plain integers. You may specify otherwise by providing either a `latin-diagrams` or `roman-diagrams` attribute to the enclosing `<body>` element, as follows: `<body latin-diagrams>`.
