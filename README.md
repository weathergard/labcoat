# Labcoat
Enhance your HTML with scholarly bibliographic and annotation features, entirely on the server-side.

## Use it anywhere.
Labcoat is a pure function&#8212;provide it with input markup text, and it will map it to the output. It's idempotent, and it's fast. That means you can:

* Pipe material into it on command line: `$ html | labcoat > file.html`

* Compile-on-the-fly in Node.js or Express: `res.end(labcoat(html))`

* Apply it to documents in the browser: 

    ```html
    ...
    <script>
      let html = document.body.innerHTML
      document.body.innerHTML = labcoat(html)
    </script>
    </body>
    ```

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
  <p>Body text.<sup id="intext-note-1"><a href="#note-1">1</a></sup></p>
  <p>More body text.</p>
  ...
  <footer class="notes">
    <ol class="notes">
      <li id="note-1"><a href="#intext-note-1">a note</a></li>
    </ol>
  </footer>
</article>
```

#### Numbering style
If you prefer alphabetical numbering for your end notes, add the `alpha` attribute as follows: `<endnotes alpha />`. Then set the `list-style` CSS property on `ol.notes` to match.

## &lt;citation /> and &lt;bibliography />
The `<citation>` and the companion `<bibliography />` elements allow the creation of linked in-text citations and a full-length, alphabetized bibliography section, using an external store of bibliographic data. Provide a file path or URL to a JSON file (format given below) as attribute.

```html
<article>
  <p>Body text (<citation jones99 />).</p>
  <p>More body text.</p>
  ...
  <bibliography dir/bib.json />
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

#### Bibliography data store
```js
// EXAMPLE ./dir/bib.json --------------------------------------
[
  {
    "id":       {String}, // 'jones99'
    "author":   {String}, // 'Jon Jones'
    "year":     {Number}, // 1999
    "title":    {String}, // 'The title'
    "url":      {String}, // 'http://uni.edu/chem/jones/doc.pdf'
    "accessed": {String}  // '25-6-2015'
  }
]
```
This is in the spirit of [BibTeX](http://www.bibtex.org/), but is expressed as valid JSON.

## &lt;index />
Use the self-closing `<index />` element to generate a linked table of contents, which references each of your `<section>` elements, using the text content of the first `<h1>` or `<h2>` within.

#### Numbering style
The numbering style of the index is determined by CSS `list-style` property on `ol.article-index`.

## &lt;example> and &lt;ex />
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
* If you want numbering to restart for each `<section>`, add the `examples-by-section` attribute.

## &lt;figure> + &lt;figcaption> and &lt;fig />
The HTML5-native `<figure>` and `<figcaption>` elements will be automatically labeled, numbered, and ID'ed. You can use labcoat's self-closing `<fig />` element to create an in-text reference to a figure, using an attribute to identify the figure.

```html
<article>
  <figure taj-mahal>
    <img src="taj-mahal.jpg">
    <figcaption>the caption</figcpation>
  </figure>
  <p>And here we see <fig taj-mahal />.</p>
</article>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <figure id="figure-1" title="taj-mahal">
    <img src"...">
    <figcaption>
        <span class="figure-label">Figure 1</span> the caption
    </figcpation>
  </figure>
  <p>And here we see <a class="figure-reference" href="figure-1">Figure 1<a>.</p>
</article>
```

<hr>

#### Performance goal
2,000-word paper, with 10 numbered examples, 10 footnotes, and 10 citations: <10ms
