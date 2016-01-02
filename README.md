# Labcoat
Enhance HTML with scholarly bibliographic and annotation features.

## Use it anywhere.
Labcoat is a *fast,* idempotent, side-effect-free, pure function with no dependencies. Its output is valid HTML5. You can use it:

1. in Node.js: `res.end(labcoat(html))`
1. in the browser: `document.body.innerHTML = labcoat(document.body.innerHTML)`
1. on the command line: `$ file.html | labcoat > file.html`

## Prefatory comment on performance
Labcoat doesn't parse HTML, find, and then manipulate elements. It transforms one markup string into another, ignoring all but a narrowly specified set of labcoat elements (of which, more in due course). The remaining material is a subregular cousin of HTML, parsing of which is virtually instant.

**Benchmark:** Given a 5kb document making heavy use of labcoat features, with both latin and roman numbering, and basic citation style, transpilation takes about 900μs (<1ms) on a 2.2ghz Core i7.

<hr>

## Install it.
`npm install labcoat [-g]`

## Start with &lt;article>
Labcoat takes the standard HTML5 `<article>` element as its domain. That is, only material within an `<article>` will be transpiled from labcoat markup to HTML.

## &lt;endnote> and &lt;endnotes />
Use the `<endnote>` element to get reciprocally-linked end notes. Use the companion self-closing `<endnotes />` element to indicate where you want the notes to appear in the transpiled HTML.

```html
<article>
  <p>Body text.<endnote>a note</endnote></p>
  <p>More body text.</p>
  ...
  <endnotes />
</article>
```
#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <p>Body text.<sup><a id="intext-note-1" href="#endnote-1">1</a></sup></p>
  <p>More body text.</p>
  ...
  <section id="endnotes">
    <ol class="endnotes-list">
      <li id="endnote-1"><a href="#intext-note-1">a note</a></li>
    </ol>
  </section>
</article>
```

#### Numbering style
Default numbering style is plain integers; provide either a `latin` or `roman` attribute, as follows: `<endnotes latin />`. Then, set the `list-style` CSS property on `ol.endnotes-list` to match.

## &lt;citation /> and &lt;bibliography />
The `<citation>` element and the companion `<bibliography>` element allow the creation of linked in-text citations and a full-length, alphabetized bibliography section, using an store of bibliographic data.

```html
<article>
  <p>Body text (<citation jones99 />).</p>
  <p>More body text.</p>
  ...
  <bibliography>
    [
      {
        "id":       {String},       // 'jones99'
        "firstname":{String},       // 'Jon'
        "lastname": {String},       // 'Jones'
        "authors":  {String|Null|}  // For
        "year":     {Number},       // 1999
        "title":    {String},       // 'The title'
        "url":      {String},       // 'http://uni.edu/chem/jones/doc.pdf'
        "accessed": {String}        // '25-6-2015'
      },
      ...
    ]
  </bibliography>
</article>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <p>Body text (<cite><a href="#jones99">Jones, 1999</a></cite>).</p>
  <p>More body text.</p>
  ...
  <section id="bibliography">
    <ol class="bibliography-list">
      <li id="jones99">
        Jones, Jon. 1999. "The title".
        <a href="http://uni.edu/chem/jones/doc.pdf">//uni.edu/chem/jones/doc.pdf</a>.
        Accessed: 25-6-2015.
      </li>
    </ol>
  </section>
</article>
```

### Citation style
Labcoat provides an APA-like citation style ("Lastname YYYY" in-text citations and an alphabetical bibliography), which is adequate for most lay writing. Additionally, labcoat's style API allows for easy use of custom styles.

#### Creating a custom citation style
A style is simply an object with three* methods for transforming bibliographic data into HTML5 citations. These three methods are:

1. ***.inText( src )*** accepts an Object parameter and returns markup, to appear in-text.
1. ***.full( src )*** accepts an Object parameter and returns `<li>` markup, to appear in the bibliography.
1. ***.order( srcA, srcB )*** an [Array.sort callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) accepting two parameters of type Object and returning a Number.

Consult [basic style](/src/citation-renderers/basic) for example code.

\*If a style does not define `.inText()` or `.full()`, the basic style method will be used in its place. If the `.order()` method is not defined, order defaults to the order of appearance in the body text (as in MLA style writing).

#### Registering a citation style
You can register as many custom styles as you like, and you may overwrite/update previously registered styles (even the provided basic style). Register as follows:
```js
// Anywhere in your app.
import style from './style'

labcoat.style(name, style)
```

1. ***name*** [required, string] is non-empty, and contains only *a&ndash;z, 0&ndash;9,* hyphen, and underscore.
1. ***style*** [required, object] defines 3 methods, described in the [previous section](#registering-a-citation-style).

#### Using a citation style
First, labcoat's basic citation style is an implicit default&mdash;it does not need to be declared in the markup. To use a custom style after you've registered it (see the # section), invoke its name in your markup, as follows:

```html
<bibliography chicago-alt>
  [
    {
      "id":       {String},       // 'jones99'
      "firstname":{String},       // 'Jon'
      "lastname": {String},       // 'Jones'
      "authors":  {String|}       // (Use for multiple authors)
      "year":     {Number},       // 1999
      "title":    {String},       // 'The title'
      "url":      {String},       // 'http://uni.edu/chem/jones/doc.pdf'
      "accessed": {String}        // '25-6-2015'
    },
    ...
  ]
</bibliography>
```

## &lt;diagram> + &lt;diagcaption> and &lt;diag />
Labcoat uses `<diagram>` and `<diagcaption>` elements to create organized `<figure>` and `<figcaption>` elements; these will be automatically labeled, numbered, and ID'ed. Use the self-closing `<diag />` element to create in-text references to your diagrams, as shown here:

```html
<article>
  <diagram taj-mahal>
    <img src="taj-mahal.jpg">
    <diagcaption>the caption</diagcaption>
  </diagram>
  <p>And here we see <diag taj-mahal />.</p>
</article>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <figure class="diagram" id="figure-1" title="taj-mahal">
    <img src="taj-mahal.jpg">
    <figcaption>
      <span class="figure-label">Figure 1</span> the caption
    </figcpation>
  </figure>
  <p>And here we see <a class="figure-reference" href="#figure-1">Figure 1<a>.</p>
</article>
```

#### Numbering style options
The default numbering style is plain integers. You may specify otherwise by providing either a `latin-diagrams` or `roman-diagrams` attribute to the enclosing article element, as follows: `<article latin-diagrams>`.

## Future Additions
### &lt;example> and &lt;ex />
Use the `<example>` element to get automatically-numbered example cases, and use the companion self-closing `<ex />` element with an attribute (see below) to get in-text numeric references to your examples.

```html
<article>
  <example ecp-violation>
    John is illegal to park here.
  </example>
  <p>Here we have example (<ex ecp-violation />).</p>
</article>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <div class="example" id="ecp-violation">
    <span class="example-number">1</span> John is illegal to park here.
  </div>
  <p>Here we have example (<a href="#ecp-violation">1</a>).</p>
</article>
```
#### Numbering style options
The default numbering style is plain integers. You may specify otherwise by providing either a `latin-examples` or `roman-examples` attribute on the enclosing article element, as follows: `<article latin-examples>`.

### &lt;index />
An `<index />` element would place-hold for a simple linked index section at the top of the `<article>` element. An earlier attempt at this reveals that it is hard to do without general HTML parsing. A non-linked version would be easy, but a linked version requires tangling with `<section>` as well as `<h1>` to `<h6>`.

A conservative solution would be to remove attribute values (`="..."`) before parsing elements, to eliminate the possibility of in-attribute-value less-than and greater-than brackets causing the parse to fail. But how then do we replace the old markup with new, without erasing the attributes? Move them to a hash table, and add them later? This becomes complex. And non-instant.
