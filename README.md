# Labcoat
Enhance your HTML with scholarly bibliographic and annotation features, entirely on the server-side.

## Use it anywhere.
Labcoat is a *fast,* idempotent, side-effect-free, pure function with no dependencies. You can use it:

1. in Node.js: `res.end(labcoat(html))`
1. in the browser: `document.body.innerHTML = labcoat(document.body.innerHTML)`
1. on the command line: `$ file.html | labcoat > file.html`

## Prefatory comment on performance
Labcoat doesn't parse HTML, find, and then manipulate elements. It transforms one markup string into another, ignoring all but a narrowly-specified set of labcoat elements (of which, more in due course). The remaining material is a subregular cousin of HTML, parsing of which is virtually instant.

**So then:** A 5KB document making heavy use of labcoat feautres typically transpiles in 2&ndash;4ms with a fast CPU.

<hr>

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
  <p>Body text.<sup><a id="intext-note-1" href="#note-1">1</a></sup></p>
  <p>More body text.</p>
  ...
  <section class="notes-section">
    <ol class="notes-list">
      <li id="note-1"><a href="#intext-note-1">a note</a></li>
    </ol>
  </section>
</article>
```

#### Numbering style
If you prefer alphabetical numbering for your end notes, add the `alpha` attribute as follows: `<endnotes alpha />`, and set the `list-style` CSS property on `ol.notes` to match.

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
        "id":       {String}, // 'jones99'
        "author":   {String}, // 'Jon Jones'
        "year":     {Number}, // 1999
        "title":    {String}, // 'The title'
        "url":      {String}, // 'http://uni.edu/chem/jones/doc.pdf'
        "accessed": {String}  // '25-6-2015'
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
    <ol>
      <li id="jones99">
        Jones, 1999. "The title". 
        <a href="http://uni.edu/chem/jones/doc.pdf">//uni.edu/chem/jones/doc.pdf</a>. 
        Accessed: 25-6-2015.
      </li>
    </ol>
  </section>
</article>
```

## &lt;diagram> + &lt;diagcaption> and &lt;diag />
Labcoat uses `<diagram>` and `<diagcaption>` elements in place of `<figure>` and `<figcaption>`. These will be automatically labeled, numbered, and ID'ed. You can use labcoat's self-closing `<diag />` element to create in-text references to your diagrams, as given here:

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
  <figure id="figure-1" title="taj-mahal">
    <img src="taj-mahal.jpg">
    <figcaption>
      <span class="figure-label">Figure 1</span> the caption
    </figcpation>
  </figure>
  <p>And here we see <a class="figure-reference" href="#figure-1">Figure 1<a>.</p>
</article>
```

#### Numbering style options
If you prefer alphabetical numbering for your diagrams (i, ii, or I, II, etc.), add the `alpha-diag` attribute to the enclosing article element, as follows: `<article alpha-diagram>`.

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
* If you prefer alphabetical numbering for your examples (i, ii, or I, II, etc.), add the `alpha-example` attribute to the enclosing article element, as follows: `<article alpha-example>`.
* If you want numbering to restart for each `<section>`, add the `examples-restart` attribute to the enclosing `<article>` element.
