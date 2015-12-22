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
  <footer>
    <ol>
      <li id="note-1"><a href="#intext-note-1">a note</a></li>
    </ol>
  </footer>
</article>

```

## &lt;citation> and &lt;bibliography />
The `<citation>` and the companion `<bibliography />` elements allow the creation of linked in-text citations and a full-length, alphabetized bibliography section, using an external store of bibliographic data. This store can be .json file stored on your server or a URL pointing to a .json file.

```html
<article>
  <p>Body text (<citation>Jones, The title</citation>).</p>
  <p>More body text.</p>
  ...
  <bibliography src="./project-root/bib.json" />
</article>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <p>Body text (<cite><a href="#jones-1999">Jones, 1999</a></cite>).</p>
  <p>More body text.</p>
  ...
  <section id="bibliography">
    <ol>
      <li id="jones-1999">
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
// EXAMPLE ./project-root/bib.json --------------------------------------
[
  {
    "author":   {String}, // 'Jon Jones'
    "year":     {Number}, // 1999
    "title":    {String}, // 'The title'
    "url":      {String}, // 'http://uni.edu/chem/jones/doc.pdf'
    "accessed": {String}  // '25-6-2015'
  }
]
```

## &lt;index />
Use the self-closing `<index />` element to generate a linked table of contents, which references each of your `<section>` elements, using the text content of the first `<h1>` or `<h2>` within.

## &lt;example> and &lt;ex />
Use the `<example>` to have automatically-numbered example cases.

```html
<article>
  <example id="ecp-violation">
    John is illegal to park here.
  </example>
  <p>Body text referencing example no. <ex src="ecp-violation" />.</p>
</article>
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&darr;&darr;

```html
<article>
  <div class="example" id="ecp-violation">
    <span class="example-number">1</span> John is illegal to park here.
  </div>
  <p>Body text referencing example no. <a href="#ecp-violation">1</a>.</p>
</article>
```
