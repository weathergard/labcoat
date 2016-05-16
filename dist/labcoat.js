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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _registry = __webpack_require__(1);

	var registry = _interopRequireWildcard(_registry);

	var _stylesApa = __webpack_require__(2);

	var _stylesApa2 = _interopRequireDefault(_stylesApa);

	var _stylesMla = __webpack_require__(4);

	var _stylesMla2 = _interopRequireDefault(_stylesMla);

	var _stylesOrders = __webpack_require__(6);

	var orders = _interopRequireWildcard(_stylesOrders);

	var _transformsBody = __webpack_require__(7);

	var _transformsBody2 = _interopRequireDefault(_transformsBody);

	var _transformsDiagrams = __webpack_require__(8);

	var _transformsDiagrams2 = _interopRequireDefault(_transformsDiagrams);

	var _transformsEndnotes = __webpack_require__(11);

	var _transformsEndnotes2 = _interopRequireDefault(_transformsEndnotes);

	var _transformsCitations = __webpack_require__(12);

	var _transformsCitations2 = _interopRequireDefault(_transformsCitations);

	var _transformsIdempotentiate = __webpack_require__(15);

	var _transformsIdempotentiate2 = _interopRequireDefault(_transformsIdempotentiate);

	/**
	 * Transpiles input markup to HTML.
	 * @function
	 * @param {String} markup
	 * @return {String}
	 */
	function transpiler(markup) {
	  if (!markup) return markup;
	  var content = (0, _transformsBody2['default'])(markup);
	  if (!content) return markup;
	  return markup.replace(content, (0, _transformsIdempotentiate2['default'])((0, _transformsDiagrams2['default'])((0, _transformsCitations2['default'])((0, _transformsEndnotes2['default'])(content.replace(/\s+/g, ' '))))));
	}

	/**
	 * Registers a citation style.
	 * @function
	 * @param {String} name
	 * @param {Object} style
	 * @return {}
	 */
	transpiler.style = function (style) {
	  if (!style) return;
	  if (!style.name) throw new Error('Styles must be registered with a name.');
	  if (style['extends']) {
	    (function () {
	      var extended = registry.get('styles', style['extends']);
	      if (!extended) throw new Error(style['extends'] + ' does not exist.');
	      delete extended.name;
	      Object.keys(style.full).forEach(function (type) {
	        extended[type] = style.full[type];
	      });
	      if (style.inText) extended.inText = style.inText;
	      if (style.order) extended.order = orders[style.order];
	      registry.set('styles', style.name, extended);
	    })();
	  } else {
	    registry.set('styles', style.name, {
	      inText: style.inText,
	      full: style.full,
	      order: orders[style.order]
	    });
	  }
	};

	transpiler.style(_stylesApa2['default']);
	transpiler.style(_stylesMla2['default']);
	exports['default'] = transpiler;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.set = set;
	exports.get = get;
	var INVALID_TYPE = 'There is no registry pool of the specified type.';
	var INVALID_NAME = 'You must provide a name to register a value.';
	var INVALID_VALUE = 'You must register a value.';

	var reg = {
	  styles: {}
	};

	function set(type, name, value) {
	  if (!type || !reg[type]) throw new Error(INVALID_TYPE);
	  if (!name) throw new Error(INVALID_NAME);
	  if (!value) throw new Error(INVALID_VALUE);
	  reg[type][name] = value;
	}

	function get(type, name) {
	  if (typeof reg[type] === 'undefined') throw new Error(INVALID_TYPE);
	  if (typeof reg[type][name] === 'undefined') return null;
	  return reg[type][name];
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _full = __webpack_require__(3);

	var full = _interopRequireWildcard(_full);

	exports['default'] = {
	  name: 'apa',
	  full: full,
	  inText: '~AUTHOR|~EDITOR|TITLE YEAR',
	  order: 'alphabetical'
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/** This file contains cite formats for all major source materials, in APA-style. */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var book = '' + '^AUTHOR. (YEAR). <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . ' + 'EDITOR+(Ed(s).). LOCATION: PUBLISHER . PAGECOUNT+pgs.';

	var bookChapter = '' + '^AUTHOR. (YEAR). CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), ' + '(EDITION+ed.) . LOCATION: PUBLISHER . pp.+PAGENUMBERS.';

	var anthology = '' + '^EDITOR. (YEAR). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER . ' + 'PAGECOUNT+pgs.';

	var journal = '' + '^AUTHOR. (YEAR). "TITLE". JOURNAL. VOLUME\(ISSUE). PAGENUMBERS.';

	var conference = '' + '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at' + '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.';

	var webpage = '' + '^AUTHOR. (DATE). TITLE. <i>WEBSITE</i>. Retrieved:+RETRIEVED. From+URL.';

	var newspaper = '' + '^AUTHOR. (YEAR, DATE). TITLE. <i>NEWSPAPER</i>, pp.+PAGENUMBERS. ' + 'Retrieved+from+URL.';

	var magazine = '' + '^AUTHOR. (YEAR, DATE). TITLE. <i>MAGAZINE</i>, VOLUME\(ISSUE), PAGENUMBERS.';

	var lecture = '' + '^AUTHOR. (YEAR). TITLE [FILEFORMAT]. Retrieved+from+URL';

	var film = '' + '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+' + 'Picture]. LOCATION: STUDIO.';

	var broadcast = '' + '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series ' + 'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.';

	exports.book = book;
	exports.bookChapter = bookChapter;
	exports.anthology = anthology;
	exports.journal = journal;
	exports.conference = conference;
	exports.webpage = webpage;
	exports.newspaper = newspaper;
	exports.magazine = magazine;
	exports.lecture = lecture;
	exports.film = film;
	exports.broadcast = broadcast;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _full = __webpack_require__(5);

	var full = _interopRequireWildcard(_full);

	exports['default'] = {
	  name: 'mla',
	  full: full,
	  inText: '~AUTHOR|~EDITOR|TITLE PAGES',
	  order: 'alphabetical'
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	/** This file contains cite formats for all major source materials, in MLA-style. */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var book = '' + '^AUTHOR. <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . ' + 'EDITOR+(Ed(s).). LOCATION: PUBLISHER, YEAR. MEDIUM.';

	var bookChapter = '' + '^AUTHOR. CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), ' + '(EDITION+ed.) . LOCATION: PUBLISHER, YEAR . PAGENUMBERS.';

	var anthology = '' + '^EDITOR. <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER, YEAR . ' + 'PAGENUMBERS.';

	var journal = '' + '^AUTHOR. "TITLE." <i>JOURNAL</i>. VOLUME\.ISSUE (YEAR) : PAGENUMBERS.';

	var conference = '' + '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at' + '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.';

	var webpage = '' + '^AUTHOR. "TITLE." <i>WEBSITE</i>, DATE YEAR. MEDIUM. RETRIEVED &lt;URL&gt;.';

	var newspaper = '' + '^AUTHOR. "TITLE." <i>NEWSPAPER</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.';

	var magazine = '' + '^AUTHOR. "TITLE." <i>MAGAZINE</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.';

	var lecture = '' + '^AUTHOR. TITLE [FILEFORMAT]. DATE YEAR . &lt;URL&gt;.';

	var film = '' + '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+' + 'Picture]. LOCATION: STUDIO.';

	var broadcast = '' + '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series ' + 'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.';

	exports.book = book;
	exports.bookChapter = bookChapter;
	exports.anthology = anthology;
	exports.journal = journal;
	exports.conference = conference;
	exports.webpage = webpage;
	exports.newspaper = newspaper;
	exports.magazine = magazine;
	exports.lecture = lecture;
	exports.film = film;
	exports.broadcast = broadcast;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Sorts citation objects by lastname, authors, or title.
	 * @param {Object} a
	 * @param {Object} b
	 * @note The default order is order of appearance in the text. Here, we change
	 * that to alphabetical order.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.alphabetical = alphabetical;
	exports.appearance = appearance;

	function alphabetical(a, b) {
	  if (a.author) a = a.author[0].toLowerCase();else if (a.title) a = a.title[0].toLowerCase();
	  if (b.author) b = b.author[0].toLowerCase();else if (b.title) b = b.title[0].toLowerCase();
	  if (a === b) return 0;
	  if ([a, b].sort()[0] === a) return -1;
	  return 1;
	}

	function appearance() {
	  return 0;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var rMain = /<main[\s\S]*?<\/main\s*?>/;
	var rTranspiled = /<main data-transpiled/;

	/**
	 * Finds the first <main> element in the markup and returns it.
	 * @function
	 * @param {String} markup
	 * @return {String|Null}
	 */

	exports["default"] = function (markup) {
	  if (rTranspiled.test(markup)) return null;
	  try {
	    return markup.match(rMain)[0];
	  } catch (err) {
	    return null;
	  }
	};

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _numberingRoman = __webpack_require__(9);

	var _numberingRoman2 = _interopRequireDefault(_numberingRoman);

	var _numberingLatin = __webpack_require__(10);

	var _numberingLatin2 = _interopRequireDefault(_numberingLatin);

	var rDiagram = /<diagram\s*?([^>]*?)\s*?>([\s\S]*?)<\/diagram\s*?>/g;
	var rCaption = /<diagcaption\s*?>([\s\S]*?)<\/diagcaption\s*?>/;
	var rDiag = /<diag\s*?([^>]*?)\s*?\/>/g;
	var rDiagId = /<diag\s*?([^>]*?)\s*?\/>/;

	/**
	 * Determines what kind of numbering is in use.
	 * @function
	 * @param {String} markup
	 * @return {Function}
	 */
	function numerals(markup) {
	  if (/latin-diagrams/.test(markup)) return _numberingLatin2['default'];
	  if (/roman-diagrams/.test(markup)) return _numberingRoman2['default'];
	  return function (int) {
	    return int.toString();
	  };
	}

	function transpileCaption(diagram, num) {
	  var diagcaption = diagram.match(rCaption);
	  if (!diagcaption) return '';
	  diagcaption = diagcaption[0].replace(rCaption, '$1');
	  return '<figcaption><span class="figure-label">Figure&nbsp;' + num + '</span>&nbsp;' + diagcaption + '</figcaption>';
	}

	/**
	 * Finds and transpiles the <diagram>, <diagcaption>, and <diag /> elements.
	 * @function
	 * @param {String} markup - a document or fragment
	 * @return {String}
	 */
	function transpile(markup) {
	  var matches = markup.match(rDiagram);
	  if (!matches) return markup;
	  var indices = {};
	  var numbering = numerals(markup);
	  matches.forEach(function (diagram, index) {
	    var ident = diagram.match(rDiagram);
	    if (!ident || !ident[0].length) return markup;
	    ident = ident[0].replace(rDiagram, '$1');
	    indices[ident] = index + 1;
	    var num = numbering(index + 1);
	    var caption = transpileCaption(diagram, num);
	    var inner = diagram.replace(rDiagram, '$2').replace(rCaption, caption);
	    var figure = '<figure id="figure-' + num + '">' + inner + '</figure>';
	    markup = markup.replace(diagram, figure);
	  });

	  var refs = (markup.match(rDiag) || []).forEach(function (ref) {
	    var ident = ref.match(rDiagId)[0].replace(rDiagId, '$1');
	    var num = numbering(indices[ident]);
	    var intext = '<a class="figure-reference" href="#figure-' + num + '">' + num + '</a>';
	    markup = markup.replace(ref, intext);
	  });
	  return markup;
	}

	exports['default'] = function (markup) {
	  try {
	    return transpile(markup);
	  } catch (err) {
	    return markup + '\n<!-- ' + 'Labcoat transpilation failed for <diagram>, <diagcaption>, and <diag /> ' + 'elements. ' + '\n' + err.stack + '\n' + ' -->';
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var key = ['', 'c', 'cc', 'ccc', 'cd', 'd', 'dc', 'dcc', 'dccc', 'cm', '', 'x', 'xx', 'xxx', 'xl', 'l', 'lx', 'lxx', 'lxxx', 'xc', '', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];

	exports['default'] = function (num) {
	  if (typeof num !== 'number') return '';
	  var digits = num.toString().split('');
	  var roman = '';
	  var i = 3;
	  while (i--) {
	    roman = (key[+digits.pop() + i * 10] || '') + roman;
	  }
	  return Array(+digits.join('') + 1).join('m') + roman;
	};

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var alphabet = ['-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

	exports['default'] = function (int) {
	  if (typeof int !== 'number') return;
	  return alphabet[int % 26];
	};

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _numberingRoman = __webpack_require__(9);

	var _numberingRoman2 = _interopRequireDefault(_numberingRoman);

	var _numberingLatin = __webpack_require__(10);

	var _numberingLatin2 = _interopRequireDefault(_numberingLatin);

	var rEndNote = /<endnote[^>]*?>[\s\S]*?<\/endnote\s*?>/g;
	var rEndNotes = /<endnotes\s?([^>]*?)\s*?\/>/;

	/**
	 * Determines what kind of numbering is in use.
	 * @function
	 * @param {String} markup
	 * @return {Function}
	 */
	function numerals(markup) {
	  var matches = markup.match(rEndNotes);
	  if (matches) {
	    var num = matches[0].replace(rEndNotes, '$1');
	    if (num === 'latin') return _numberingLatin2['default'];
	    if (num === 'roman') return _numberingRoman2['default'];
	  }
	  return function (int) {
	    return int.toString();
	  };
	}

	/**
	 * Finds and transpiles the <endnote> and <endnotes /> elements.
	 * @function
	 * @param {String} markup - a document or fragment
	 * @return {String}
	 */
	function transpile(markup) {
	  var notes = markup.match(rEndNote) || [];
	  var numbering = numerals(markup);
	  notes.forEach(function (note, index) {
	    var num = numbering(index + 1);
	    var ref = '<sup><a id="intext-note-' + num + '" href="#endnote-' + num + '">' + num + '</a></sup>';
	    markup = markup.replace(note, ref);
	  });
	  var li = notes.map(function (note) {
	    return note.replace(/<\/?endnote>/g, '');
	  }).map(function (note, index) {
	    var num = numbering(index + 1);
	    return '<li><a id="endnote-' + num + '" href="#intext-note-' + num + '">' + note + '</a></li>';
	  });
	  var footer = '<section class="endnotes"><ol class="endnotes-list">' + li.join('') + '</ol></section>';
	  markup = markup.replace(rEndNotes, footer);
	  return markup;
	}

	exports['default'] = function (markup) {
	  try {
	    return transpile(markup);
	  } catch (err) {
	    return markup + '\n<!-- ' + 'Labcoat transpilation failed for <endnote> and <endnotes /> ' + 'elements. ' + '\n' + err.stack + '\n' + ' -->';
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _registry = __webpack_require__(1);

	var registry = _interopRequireWildcard(_registry);

	var _citeFormat = __webpack_require__(13);

	var _citeFormat2 = _interopRequireDefault(_citeFormat);

	var rBib = /<bibliography\s*([^>]*?)\s*>([\s\S]*?)<\/bibliography\s?>/;
	var rCitation = /<citation\s([^>]+?)\s?\/>/g;

	function duckType(source) {
	  if (!source.type) source.type = 'book';
	}

	function full(source, style) {
	  duckType(source);
	  var format = style.full[source.type];
	  try {
	    return '<li id="' + source.id + '">' + (0, _citeFormat2['default'])(source, format) + '</li>';
	  } catch (err) {
	    return '\n<!-- Failed to interpolate citation ' + source.id + '. \n' + err.stack + '\n -->\n';
	  }
	}

	function inText(source, style) {
	  try {
	    return '' + '<cite class="in-text-citation">' + '<a href="#' + source.id + '">' + (0, _citeFormat2['default'])(source, style.inText) + '</a>' + '</cite>';
	  } catch (err) {
	    return '\n<!-- Failed to interpolate citation ' + source.id + '. \n' + err.stack + '\n -->\n';
	  }
	}

	/**
	 * Turns an array into an object (keyed by <array-element>.id).
	 * @function
	 * @param {Array} bib
	 * @return {Object}
	 */
	function mapBibData(bib) {
	  var obj = {};
	  bib.forEach(function (source) {
	    obj[source.id] = source;
	  });
	  return obj;
	}

	/**
	 * Grabs an parses either embedded data or from a file or URL.
	 * @function
	 * @param {String} markup
	 * @return {Object}
	 */
	function getBibData(markup) {
	  var bib = undefined;
	  if (rBib.test(markup)) {
	    bib = markup.match(rBib)[0].replace(rBib, '$2');
	    try {
	      bib = mapBibData(JSON.parse(bib));
	    } catch (err) {
	      bib = [];
	    }
	  }
	  return bib;
	}

	/**
	 * Retrieves the <bibliography> tag attribute to get the citation render
	 * functions from the registry.
	 * @function
	 * @param {String} markup
	 * @return {Object}
	 * @note Missing render functions individiually default to basic-style.
	 */
	function getStyle(markup) {
	  var style = markup.match(rBib).shift().replace(rBib, '$1') || 'apa';
	  return registry.get('styles', style);
	}

	/**
	 * Finds and transpiles the <citation> and <bibliography /> elements.
	 * @function
	 * @param {String} markup - a document or fragment
	 * @return {String}
	 */
	function transpile(markup) {
	  var matches = markup.match(rCitation);
	  if (!matches) return markup;
	  var bib = getBibData(markup);
	  var style = getStyle(markup);
	  var refs = matches.map(function (element) {
	    var id = element.replace(rCitation, '$1');
	    var source = bib[id] || { id: id };
	    markup = markup.replace(element, inText(source, style));
	    return source;
	  });
	  refs = refs.filter(function (item, index) {
	    return refs.indexOf(item) === index;
	  });
	  var li = refs.sort(style.order).map(function (source) {
	    return full(source, style);
	  });
	  var bibSection = '<section id="bibliography"><ol class="bibliography-list">' + li.join('') + '</ol></section>';
	  return markup.replace(rBib, bibSection);
	}

	exports['default'] = function (markup) {
	  try {
	    return transpile(markup);
	  } catch (err) {
	    return markup + '\n<!-- ' + 'Labcoat transpilation failed for <citation> and <bibliography /> ' + 'elements. ' + '\n' + err.stack + '\n' + ' -->';
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Sorts citation objects by lastname, authors, or title.
	 * @param {Object} a
	 * @param {Object} b
	 * @note The default order is order of appearance in the text. Here, we change
	 * that to alphabetical order.
	 */
	'use strict';

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

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var rMain = /<main/g;

	exports['default'] = function (markup) {
	  return markup.replace(rMain, '<main data-transpiled');
	};

	module.exports = exports['default'];

/***/ }
/******/ ]);