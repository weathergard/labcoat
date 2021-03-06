var labcoat =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var INVALID_TYPE = 'There is no registry pool of the specified type.'
var INVALID_NAME = 'You must provide a name to register a value.'
var INVALID_VALUE = 'You must register a value.'
var reg = {styles: {}}

exports.set = function (type, name, value) {
  if (!type || !reg[type]) { throw new Error(INVALID_TYPE) }
  if (!name) { throw new Error(INVALID_NAME) }
  if (!value) { throw new Error(INVALID_VALUE) }
  reg[type][name] = value
}

exports.get = function (type, name) {
  if (typeof reg[type] === 'undefined') { throw new Error(INVALID_TYPE) }
  if (typeof reg[type][name] === 'undefined') { return null }
  return reg[type][name]
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = ('-abcdefghijklmnopqrstuvwxyz').split('')

function latinNumbering (int) {
  return typeof int === 'number' ? alphabet[int % 26] : undefined
}

latinNumbering.class = 'latin-numbering'
latinNumbering.style = 'list-style:lower-latin;'
module.exports = latinNumbering


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var key = [
  '','c','cc','ccc','cd','d','dc','dcc','dccc','cm',
  '','x','xx','xxx','xl','l','lx','lxx','lxxx','xc',
  '','i','ii','iii','iv','v','vi','vii','viii','ix'
]

function romanNumbering(num) {
  if (typeof num !== 'number') { return '' }
  var digits = num.toString().split('')
  var roman = ''
  var i = 3
  while (i--) {
    roman = (key[+digits.pop() + (i * 10)] || '') + roman
  }
  return Array(+digits.join('') + 1).join('m') + roman
}

romanNumbering.class = 'roman-numbering'
romanNumbering.style = 'list-style:lower-roman;'
module.exports = romanNumbering


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  full: __webpack_require__(11),
  name: 'apa',
  order: 'alphabetical',
  inText: '~AUTHOR|~EDITOR|TITLE YEAR'
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  full: __webpack_require__(12),
  name: 'mla',
  order: 'alphabetical',
  inText: '~AUTHOR|~EDITOR|TITLE PAGES'
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Sorts citation objects by lastname, authors, or title.
 * @param {Object} a
 * @param {Object} b
 * @note The default order is order of appearance in the text. Here, we change
 * that to alphabetical order.
 */
exports.alphabetical = function(a, b) {
  if (a.author) { a = a.author[0].toLowerCase() }
  else if (a.title) { a = a.title[0].toLowerCase() }
  if (b.author) { b = b.author[0].toLowerCase() }
  else if (b.title) { b = b.title[0].toLowerCase() }
  if (a === b) { return 0 }
  if ([a, b].sort()[0] === a) { return -1 }
  return 1
}

exports.appearance = function (_){ return 0; }


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rTranspiled = /labcoat-transpiled/

/**
 * Finds the first <main> element in the markup and returns it.
 * @param {String} markup
 * @return {String|null}
 */
module.exports = function (markup) { return rTranspiled.test(markup) ? null : markup; }


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var registry = __webpack_require__(0)
var citeFormat = __webpack_require__(13)
var rBib = /<bibliography\s*([^>]*?)\s*>([\s\S]*?)<\/bibliography\s?>/
var rCitation = /<citation\s([^>]+?)\s?\/>/g

function duckType(source) {if (!source.type) { source.type = 'book' }}

function full(source, style) {
  duckType(source)
  var format = style.full[source.type]
  try {
    return '<li id="' + source.id + '">' + citeFormat(source, format) + '</li>'
  } catch (err) {
    return '\n<!-- Failed to interpolate citation ' + source.id + '. \n' + err.stack + '\n -->\n'
  }
}

function inText(source, style) {
  try {
    return (
     ("<cite class=\"in-text-citation\"><a href=\"#" + (source.id) + "\">" + (citeFormat(source, style.inText)) + "</a></cite>")
    )
  } catch (err) {
    return ("\n<!-- Failed to interpolate citation " + (source.id) + ". \n" + (err.stack) + "\n -->\n")
  }
}

/**
 * Turns an array into an object (keyed by <array-element>.id).
 * @param {Array} bib
 * @return {Object}
 */
function mapBibData (bib) {
  var obj = {}
  bib.forEach(function (source) {if ('id' in source) { obj[source.id] = source }})
  return obj
}

/**
 * Grabs an parses either embedded data or from a file or URL.
 * @param {String} markup
 * @return {Object}
 */
function getBibData(markup) {
  var output = []
  var bib
  if (rBib.test(markup)) {
    bib = markup
      .match(rBib)[0]
      .replace(rBib, '$2')
      .replace(/(^\s*\[)|(\]\s*$)/g, '')
      .replace(/({|,)\s*([A-z0-9_-]+):/g, '$1"$2":') // <- Add prop name quotes.
      .replace(/,\s*}/g, '}') // <-- Remove bad trailing commas.

    if (!bib) { return output }
    bib.split(/}[^{]*{/g).forEach(function (record) {
      if (!/^\s*{/.test(record)) { record = '{' + record }
      if (!/}\s*$/.test(record)) { record += '}' }
      try {
        output.push(JSON.parse(record))
      } catch (err) {
        output.push({input:record, err: err})
      }
    })
    output = mapBibData(output)
  }
  return output
}

/**
 * Retrieves the <bibliography> tag attribute to get the citation render
 * functions from the registry.
 * @param {String} markup
 * @return {Object}
 * @note Missing render functions individiually default to basic-style.
 */
function getStyle(markup) {
  var style = markup.match(rBib).shift().replace(rBib, '$1') || 'apa'
  var theStyle = registry.get('styles', style)
  return theStyle || registry.get('styles', 'apa')
}

/**
 * Finds and transpiles the <citation> and <bibliography /> elements.
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  var matches = markup.match(rCitation)
  if (!matches) { return markup }
  var bib = getBibData(markup)
  var style = getStyle(markup)
  var refs = matches.map(function (element) {
    var id = element.replace(rCitation, '$1')
    var source = bib[id] || {id: id}
    markup = markup.replace(element, inText(source, style))
    return source
  })
  refs = refs.filter(function (item, i) { return refs.indexOf(item) === i; })
  refs.sort(style.order)
  var li = refs.map(function (source) { return full(source, style); })
  var bibSection = (
    ("<section id=\"bibliography\">\n      <ol class=\"bibliography-list\">" + (li.join('')) + "</ol>\n    </section>")
  )
  return markup.replace(rBib, bibSection)
}

module.exports = function (markup) {
  try {
    return transpile(markup)
  } catch (err) {
    return (
      markup +
      '\n<!-- '+
      'Labcoat transpilation failed for <citation> and <bibliography /> '+
      'elements. '+
      '\n' + err.stack + '\n'+
      ' -->'
    )
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var romanNumeral = __webpack_require__(2)
var latinNumeral = __webpack_require__(1)
var rDiagram = /<diagram\s*?([^>]*?)\s*?>([\s\S]*?)<\/diagram\s*?>/g
var rCaption = /<diagcaption\s*?>([\s\S]*?)<\/diagcaption\s*?>/
var rDiag = /<diag\s*?([^>]*?)\s*?\/>/g
var rDiagId = /<diag\s*?([^>]*?)\s*?\/>/

/**
 * Determines what kind of numbering is in use.
 * @param {String} markup
 * @return {Function}
 */
function numerals(markup) {
  if (/latin-diagrams/.test(markup)) { return latinNumeral }
  if (/roman-diagrams/.test(markup)) { return romanNumeral }
  return function (int) {return int.toString()}
}

function transpileCaption(diagram, num) {
  var diagcaption = diagram.match(rCaption)
  if (!diagcaption) { return '' }
  diagcaption = diagcaption[0].replace(rCaption, '$1')
  return (
    ("<figcaption>\n      <span class=\"figure-label\">Figure&nbsp;" + num + "</span>&nbsp;" + diagcaption + "\n    </figcaption>")
  )
}

function getDiagramNumberById(diagrams, id) {
  var number = '?'
  diagrams.forEach(function (diagram) {
    if (diagram.id === id) { number = diagram.number.toString() }
  })
  return number
}

function transpileDiagrams(markup) {
  var numbering = numerals(markup || '')
  var diagrams = markup.match(rDiagram) || []
  diagrams = diagrams.map(function (diagram, i) { return ({
    index: i,
    markup: diagram,
    number: numbering(i + 1),
    id: diagram.replace(rDiagram, '$1').replace(/\s/g, '')
  }); })
  diagrams.forEach(function (diagram) {
    var caption = transpileCaption(diagram.markup, diagram.number)
    var inner = diagram.markup.replace(rDiagram, '$2').replace(rCaption, caption)
    var figure = '<figure id="figure-' + diagram.number + '">' + inner + '</figure>'
    markup = markup.replace(diagram.markup, figure)
  })
  return {markup: markup, model: diagrams}
}

function transpileDiags(markup, diagrams) {
  var diags = markup.match(rDiag) || []
  diags = diags.map(function (diag) {
    return {
      id: diag.replace(rDiagId, '$1').replace(/\s/g, ''),
      markup: diag
    }
  })
  diags.forEach(function (diag) {
    var number = getDiagramNumberById(diagrams, diag.id)
    var intext = (
      ("<a class=\"figure-reference\" href=\"#figure-" + number + "\">" + number + "</a>")
    )
    markup = markup.replace(diag.markup, intext)
  })
  return markup
}

function transpile(markup) {
  var diagramsDone = transpileDiagrams(markup)
  return transpileDiags(diagramsDone.markup, diagramsDone.model)
}

/**
 * Finds and transpiles the <diagram>, <diagcaption>, and <diag /> elements.
 * @param {String} markup
 * @return {String}
 */
module.exports = function (markup) {
  try {
    return transpile(markup)
  } catch (err) {
    return (
      markup +
      '\n<!-- '+
      'Labcoat transpilation failed for <diagram>, <diagcaption>, and <diag /> '+
      'elements. '+
      '\n' + err.stack + '\n'+
      ' -->'
    )
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var romanNumeral = __webpack_require__(2)
var latinNumeral = __webpack_require__(1)
var rEndNote = /<endnote[^>]*?>[\s\S]*?<\/endnote\s*?>/g
var rEndNotes = /<endnotes\s?([^>]*?)\s*?\/>/

/**
 * Determines what kind of numbering is in use.
 * @param {String} markup
 * @return {Function}
 */
function numerals(markup) {
  var matches = markup.match(rEndNotes)
  if (matches) {
    var num = matches[0].replace(rEndNotes, '$1')
    if (num === 'latin') { return latinNumeral }
    if (num === 'roman') { return romanNumeral }
  }
  return function (int) {return int.toString()}
}

/**
 * Finds and transpiles the <endnote> and <endnotes /> elements.
 * @param {String} markup - a document or fragment
 * @return {String}
 */
function transpile(markup) {
  var notes = markup.match(rEndNote) || []
  var numbering = numerals(markup)
  notes.forEach(function (note, index) {
    var num = numbering(index + 1)
    var ref = "<sup><a id=\"intext-note-" + num + "\" href=\"#endnote-" + num + "\">" + num + "</a></sup>"
    markup = markup.replace(note, ref)
  })
  var li = notes
    .map(function (note) { return note.replace(/<\/?endnote\s*>/g, ''); })
    .map(function (note, i) {
      var num = numbering(i + 1)
      return ("<li><a id=\"endnote-" + num + "\" href=\"#intext-note-" + num + "\">" + note + "</a></li>")
    })
  var footer = (("\n    <section class=\"endnotes\">\n      <ol\n        class=\"endnotes-list " + (numbering.class || '') + "\"\n        style=\"" + (numbering.style|| '') + "\">\n          " + (li.join('')) + "\n      </ol>\n    </section>\n  "))
  return markup.replace(rEndNotes, footer)
}

module.exports = function (markup) {
  try {
    return transpile(markup)
  } catch (err) {
    return (
      markup +
      '\n<!-- '+
      'Labcoat transpilation failed for <endnote> and <endnotes /> elements. '+
      '\n' + err.stack + '\n'+
      ' -->'
    )
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (markup) { return markup += '<!--labcoat-transpiled-->'; }


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.book = (
  '^AUTHOR. (YEAR). <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER . PAGECOUNT+pgs.'
)
exports.bookChapter = (
  '^AUTHOR. (YEAR). CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER . pp.+PAGENUMBERS.'
)
exports.anthology = (
  '^EDITOR (Ed.). (YEAR). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER . '+
  'PAGECOUNT+pgs.'
)
exports.journal = '^AUTHOR. (YEAR). "TITLE". JOURNAL. VOLUME\(ISSUE). PAGENUMBERS.'
exports.conference = (
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'
)
exports.webpage = (
  '^AUTHOR. (DATE). TITLE. <i>WEBSITE</i>. Retrieved:+RETRIEVED. From+URL.'
)
exports.newspaper = (
  '^AUTHOR. (YEAR, DATE). TITLE. <i>NEWSPAPER</i>, pp.+PAGENUMBERS. '+
  'Retrieved+from+URL.'
)
exports.magazine = (
  '^AUTHOR. (YEAR, DATE). TITLE. <i>MAGAZINE</i>, VOLUME\(ISSUE), PAGENUMBERS.'
)
exports.lecture = (
  '^AUTHOR. (YEAR). TITLE [FILEFORMAT]. Retrieved+from+URL'
)
exports.film = (
  '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+'+
  'Picture]. LOCATION: STUDIO.'
)
exports.broadcast = (
  '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series '+
  'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.'
)


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.book = (
  '^AUTHOR. <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER, YEAR. MEDIUM.'
)
exports.bookChapter = (
  '^AUTHOR. CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER, YEAR . PAGENUMBERS.'
)
exports.anthology = (
  '^EDITOR (Ed.). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER, YEAR . '+
  'PAGENUMBERS.'
)
exports.journal = (
  '^AUTHOR. "TITLE." <i>JOURNAL</i>. VOLUME\.ISSUE (YEAR) : PAGENUMBERS.'
)
exports.conference = (
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'
)
exports.webpage = (
  '^AUTHOR. "TITLE." <i>WEBSITE</i>, DATE YEAR. MEDIUM. RETRIEVED &lt;URL&gt;.'
)
exports.newspaper = (
  '^AUTHOR. "TITLE." <i>NEWSPAPER</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'
)
exports.magazine = (
  '^AUTHOR. "TITLE." <i>MAGAZINE</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'
)
exports.lecture = '^AUTHOR. TITLE [FILEFORMAT]. DATE YEAR . &lt;URL&gt;.'
exports.film = (
  '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+'+
  'Picture]. LOCATION: STUDIO.'
)
exports.broadcast = (
  '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series '+
  'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.'
)


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _namesList = __webpack_require__(14);

var _namesList2 = _interopRequireDefault(_namesList);

var FIELD = /([A-Z^|~]{3,100})/g;
var CARROT = /^\^/;
var TILDE = /~/;
var BAR = /\|/g;
var NAMES = /^(authors?|editors?|translators?|contributors?|composers?|directors?|performers?)$/;

/**
 * Simple object clone.
 * @function
 * @param {Object} source
 * @return {Object}
 */
function clone(source) {
  var obj = {};
  if (typeof source !== 'object') return {};
  Object.keys(source).forEach(function (key) {
    obj[key] = source[key];
  });
  return obj;
}

/**
 * Implements modifiers and value interpolation.
 * @function
 * @param {String} fieldname
 * @param {Object} source
 * @return {String}
 */
function getValue(fieldname, source) {
  var invertAll = true;
  var long = true;
  var value = null;
  if (BAR.test(fieldname)) {
    var fields = fieldname.split(BAR);
    fields.some(function (name) {
      var key = name.replace(CARROT, '').replace(TILDE, '');
      if (typeof source[key] !== 'undefined') {
        fieldname = name;
        return true;
      }
    });
  }
  if (TILDE.test(fieldname)) {
    long = false;
    fieldname = fieldname.replace(TILDE, '');
  }
  if (CARROT.test(fieldname)) {
    invertAll = false;
    fieldname = fieldname.replace(CARROT, '');
  }
  value = source[fieldname];
  delete source[fieldname];
  if (NAMES.test(fieldname)) value = (0, _namesList2['default'])(value, invertAll, long);
  return value || 'EMPTY';
}

/**
 * Filters out illicit punctuation sequences.
 * @function
 * @param {String} str
 * @return {String}
 */
function punctuationFilter(_x) {
  var _again = true;

  _function: while (_again) {
    var inStr = _x;
    _again = false;

    var outStr = inStr
    // Commas
    .replace(/,+/g, ',').replace(/,([.)\]])/g, '$1').replace(/([(\[]),/g, '$1')

    // Periods
    .replace(/\.+/g, '.').replace(/\(\./g, '.').replace(/\[\./g, ']')

    // Colons
    .replace(/:+/g, ':').replace(/:\./g, '.').replace(/:,/g, ',').replace(/:\)/g, ')').replace(/\(:/g, '(').replace(/:\]/g, ']').replace(/\[:/g, '[').replace(/:([^\s\/])/g, ': $1')

    // Spaces
    .replace(/\(\s/g, '(').replace(/\s\)/g, ')').replace(/\[\s/g, '[').replace(/\s\]/g, ']').replace(/,([^\s])/g, ', $1').replace(/\s([\.,:])/g, '$1').replace(/\s+$/, '')

    // Left edge
    .replace(/^[\[\],.:()\s]+/g, '')

    // Right edge
    .replace(/[,:(\[\s]+$/g, '');
    if (inStr !== outStr) {
      _x = outStr;
      _again = true;
      outStr = undefined;
      continue _function;
    }
    return outStr;
  }
}

/**
 * Renders data into a Cite Format string.
 * @function
 * @return {}
 */

exports['default'] = function (data, format) {

  var source = undefined,
      fields = undefined;

  if (!data || !format) return '';
  format = format.replace(/\+/g, '__').replace(FIELD, '@@$1@@');
  fields = format.match(FIELD);
  if (!fields) return '';
  source = clone(data);
  fields.forEach(function (field) {
    var fieldname = field.toLowerCase();
    var value = getValue(fieldname, source) || 'EMPTY';
    format = format.replace(field, value).replace(/[^\s@|]*@@EMPTY@@[^\s@|]*/g, '');
  });
  return punctuationFilter(format.replace(/@@|\|/g, '').replace(/__/g, ' ').replace(/\s+/g, ' ').replace(/(\s*\.)+/g, '.'));
};

module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Sorts citation objects by lastname, authors, or title.
 * @param {Object} a
 * @param {Object} b
 * @note The default order is order of appearance in the text. Here, we change
 * that to alphabetical order.
 */


Object.defineProperty(exports, '__esModule', {
  value: true
});
function order(a, b) {
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  return 0;
}

/**
 * Flips "lastname, firstname" to "firstname lastname."
 * @function
 * @param {String} name
 * @return {String}
 */
function invertName(name) {
  var split = name.split(', ');
  if (split[0] && split[1]) {
    return split[1] + ' ' + split[0];
  } else {
    return name;
  }
}

/**
 * Returns the long-type names list, as appears in full length citations.
 * @function
 * @param {Array} people
 * @param {Boolean|} intertAll
 * @return {String}
 */
function longNames(people, invertAll) {
  return people.map(function (person, index) {
    if (index > 0 || invertAll) person = invertName(person);
    if (index === 0) return person;
    if (index > 0 && index < people.length - 1) {
      return ', ' + person;
    } else if (index === people.length - 1) {
      return ' &amp; ' + person;
    }
  }).join('');
}

/**
 * Returns the short-type names list (e.g., Jones et al.).
 * @function
 * @param {Array} people
 * @return {String}
 */
function shortNames(people) {
  if (!people || !people.length) return [];
  people = people.map(function (person) {
    if (/,/.test(person)) return person.split(', ')[0];
    return person;
  });
  if (people.length === 1) {
    return people[0];
  } else if (people.length === 2) {
    return people[0] + ' &amp; ' + people[1];
  } else if (people.length > 2) {
    return people[0] + ' et al.';
  }
}

/**
 * Formats a list of names.
 * @param {Array} people
 * @param {Boolean|} invertAll
 * @param {Boolean|} long
 * @return {String}
 */

exports['default'] = function (people, invertAll, long) {
  if (!people) return '';
  people = people.split(' and ');
  people = people.sort(order);
  if (long) return longNames(people, invertAll);
  return shortNames(people);
};

module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var registry = __webpack_require__(0)
var apa = __webpack_require__(3)
var mla = __webpack_require__(4)
var orders = __webpack_require__(5)
var body = __webpack_require__(6)
var diagrams = __webpack_require__(8)
var endnotes = __webpack_require__(9)
var citations = __webpack_require__(7)
var idempotentiate = __webpack_require__(10)

/**
 * Transpiles input markup to HTML.
 * @param {String} markup
 * @return {String}
 */
function transpiler (markup) {
  if (!markup) { return markup }
  var content = body(markup)
  if (typeof content !== 'string' || !content) { return markup }
  return markup.replace(
    content,
    idempotentiate(diagrams(citations(endnotes(content.replace(/\s+/g, ' ')))))
  )
}

/**
 * Registers a citation style.
 * @param {String} name
 * @param {Object} style
 * @return {undefined}
 */
transpiler.style = function (style) {
  if (!style) { return }
  if (!style.name) { throw new Error('Styles must be registered with a name.') }
  if (style.extends) {
    var extended = registry.get('styles', style.extends)
    if (!extended) { throw new Error(style.extends + ' does not exist.') }
    delete extended.name
    Object.keys(style.full).forEach(function (type) { return extended[type] = style.full[type]; })
    if (style.inText) { extended.inText = style.inText }
    if (style.order) { extended.order = orders[style.order] }
    registry.set('styles', style.name, extended)
  } else {
    registry.set('styles', style.name, {
      inText: style.inText,
      full: style.full,
      order: orders[style.order]
    })
  }
}

transpiler.style(apa)
transpiler.style(mla)
module.exports = transpiler

/**
 * Transpiles body.innerHTML if not in node.js.
 * @return {undefined}
 */
;(function (_){
  if (typeof module !== 'undefined' && module.exports) { return }
  document.addEventListener('DOMContentLoaded', function () {
    var transpiled = transpiler(document.body.innerHTML)
    if (transpiled !== document.body.innerHTML) {
      document.body.innerHTML = transpiled
    }
  })
})()


/***/ })
/******/ ]);