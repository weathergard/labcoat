# Labcoat
Enhance HTML with scholarly bibliographic and annotation features.

## Use it anywhere.
Labcoat is a *fast,* idempotent, side-effect-free, pure function with no dependencies. Its output is valid HTML5. You can use it:

1. in Node.js: `res.end(labcoat(html))`
1. in the browser: `document.body.innerHTML = labcoat(document.body.innerHTML)`
1. on the command line: `labcoat file.html` (Coming soon.)

## Prefatory comment on performance
Labcoat doesn't parse HTML, find, and then manipulate elements. It transforms one markup string into another, ignoring all but a narrowly specified set of labcoat elements (of which, more in due course). The remaining material is a subregular cousin of HTML, parsing of which is virtually instant.

**Benchmark:** Given a 5kb document making heavy use of labcoat features, with both latin and roman numbering, and APA citations, transpilation takes &approx;1 millisecond on a 2.2ghz Core i7 (node 5.x).

<hr>

## Install it.
`npm install labcoat`

## Start with &lt;main>
Labcoat takes the standard HTML5 `<main>` element as its domain. That is, only material within an `<main>` will be transpiled from labcoat markup to HTML. In the unlikely event that transpilation fails, examine the helpful comment(s) left by the transpiler in the output HTML, just before the closing `</main>` tag.

## &lt;endnote> and &lt;endnotes />
Use the `<endnote>` element to get reciprocally-linked end notes. Use the companion self-closing `<endnotes />` element to indicate where you want the notes to appear in the transpiled HTML.

```html
<main>
  <p>Body text.<endnote>a note</endnote></p>
  <endnotes />
</main>
```
#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<main>
  <p>Body text.<sup><a id="intext-note-1" href="#endnote-1">1</a></sup></p>
  <section id="endnotes">
    <ol class="endnotes-list">
      <li id="endnote-1"><a href="#intext-note-1">a note</a></li>
    </ol>
  </section>
</main>
```

#### Numbering style
Default numbering style is plain integers; provide either a `latin` or `roman` attribute, as follows: `<endnotes latin />`. Then, set the `list-style` CSS property on `ol.endnotes-list` to match.

## &lt;citation /> and &lt;bibliography />
The `<citation>` element and the companion `<bibliography>` element allow the creation of linked in-text citations and a full-length, alphabetized bibliography section, using an store of bibliographic data.

```html
<main>
  <p>Body text (<citation chomsky93 />).</p>
  <bibliography>
    [
      {
        "id":         'chomsky93',
        "firstname":  'Noam',
        "lastname":   'Chomsky',
        "year":       1993,
        "title":      'The Minimalist Program',
        "publisher":  'MIT Press'
      }
    ]
  </bibliography>
</main>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<main>
  <p>Body text (<cite><a href="#chomsky93">Chomsky 1993</a></cite>).</p>
  <section id="bibliography">
    <ol class="bibliography-list">
      <li id="chomsky93">
        Chomsky, Noam. (1993). The Minimalist Program. MIT Press.
      </li>
    </ol>
  </section>
</main>
```

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
<main>
  <diagram taj-mahal>
    <img src="taj-mahal.jpg">
    <diagcaption>the caption</diagcaption>
  </diagram>
  <p>And here we see <diag taj-mahal />.</p>
</main>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<main>
  <figure class="diagram" id="figure-1" title="taj-mahal">
    <img src="taj-mahal.jpg">
    <figcaption>
      <span class="figure-label">Figure 1</span> the caption
    </figcpation>
  </figure>
  <p>And here we see <a class="figure-reference" href="#figure-1">Figure 1<a>.</p>
</main>
```

#### Numbering style options
The default numbering style is plain integers. You may specify otherwise by providing either a `latin-diagrams` or `roman-diagrams` attribute to the enclosing `<main>` element, as follows: `<main latin-diagrams>`.

## Future Additions
### &lt;example> and &lt;ex />
Use the `<example>` element to get automatically-numbered example cases, and use the companion self-closing `<ex />` element with an attribute (see below) to get in-text numeric references to your examples.

```html
<main>
  <example ecp-violation>
    John is illegal to park here.
  </example>
  <p>Here we have example (<ex ecp-violation />).</p>
</main>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<main>
  <div class="example" id="ecp-violation">
    <span class="example-number">1</span> John is illegal to park here.
  </div>
  <p>Here we have example (<a href="#ecp-violation">1</a>).</p>
</main>
```
#### Numbering style options
The default numbering style is plain integers. You may specify otherwise by providing either a `latin-examples` or `roman-examples` attribute on the enclosing main element, as follows: `<main latin-examples>`.
