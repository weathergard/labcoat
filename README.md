# Labcoat
Enhance your HTML with scholarly bibliographic and annotation features, entirely on the server-side.

## Use it as:
* a command line pipe
* a node.js include

## Start with &lt;article>
Labcoat takes the standard HTML5 `<article>` element as its domain. That is, only material within an `<article>` will be transpiled from labcoat markup to HTML.

## &lt;footnote> and &lt;notes />
Use the `<footnote>` element to get reciprocally-linked foot notes. Use the companion self-closing `<footnotes />` element to indicate where you want the notes to appear in the transpiled HTML.

```html
<article>
  <p>Body text.<footnote>a note</footnote></p>
  <p>More body text.</p>
  ...
  <notes />
</article>
```
#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <p>Body text.<sup id="intext-note-1"><a href="#note-1">1</a></sup></p>
  <p>More body text.</p>
  ...
  <footer class="footnotes">
    <ol>
      <li id="note-1"><a href="#intext-note-1">a note</a></li>
    </ol>
  </footer>
</article>
```

#### Numbering style
If you prefer alphabetical numbering for your footnotes (i, ii, or I, II, etc.), add the `alpha-footnotes` attribute to your enclosing article element, as follows: `<article alpha-footnotes>`. You'll need to use CSS to style your `<ol>` numbering style to match. 

## &lt;citation /> and &lt;bibliography />
The `<citation>` and the companion `<bibliography />` elements allow the creation of linked in-text citations and a full-length, alphabetized bibliography section, using an external store of bibliographic data. This store can be .json file stored on your server or a URL pointing to a .json file.

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
#### Numbering style
If you prefer alphabetical numbering for your examples (i, ii, or I, II, etc.), add the `alpha-example` attribute to your enclosing article element, as follows: `<article alpha-example>`.
