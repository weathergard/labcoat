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

	var _transformsBody = __webpack_require__(2);

	var _transformsBody2 = _interopRequireDefault(_transformsBody);

	var _transformsDiagrams = __webpack_require__(3);

	var _transformsDiagrams2 = _interopRequireDefault(_transformsDiagrams);

	var _transformsEndnotes = __webpack_require__(6);

	var _transformsEndnotes2 = _interopRequireDefault(_transformsEndnotes);

	var _transformsCitations = __webpack_require__(7);

	var _transformsCitations2 = _interopRequireDefault(_transformsCitations);

	var _transformsIdempotentiate = __webpack_require__(8);

	var _transformsIdempotentiate2 = _interopRequireDefault(_transformsIdempotentiate);

	var _citationRenderersBasic = __webpack_require__(9);

	var basic = _interopRequireWildcard(_citationRenderersBasic);

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
	  return markup.replace(content, (0, _transformsIdempotentiate2['default'])((0, _transformsDiagrams2['default'])((0, _transformsCitations2['default'])((0, _transformsEndnotes2['default'])(content)))));
	}

	/**
	 * Registers a citation style.
	 * @function
	 * @param {String} name
	 * @param {Object} style
	 * @return {}
	 */
	transpiler.style = function (name, style) {
	  registry.set('styles', name, {
	    inText: style.inText,
	    full: style.full,
	    order: style.order
	  });
	};

	transpiler.style('basic', basic);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _numberingRoman = __webpack_require__(4);

	var _numberingRoman2 = _interopRequireDefault(_numberingRoman);

	var _numberingLatin = __webpack_require__(5);

	var _numberingLatin2 = _interopRequireDefault(_numberingLatin);

	var rDiagram = /<diagram\s*?([^>]*?)\s*?>([\s\S]*?)<\/diagram>/g;
	var rCaption = /<diagcaption>([\s\S]*?)<\/diagcaption>/;
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
	  return '<figcaption><span class="figure-label">Figure&nbsp;' + num + '\n    </span>&nbsp;' + diagcaption + '</figcaption>';
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
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _numberingRoman = __webpack_require__(4);

	var _numberingRoman2 = _interopRequireDefault(_numberingRoman);

	var _numberingLatin = __webpack_require__(5);

	var _numberingLatin2 = _interopRequireDefault(_numberingLatin);

	var rEndNote = /<endnote[^>]*?>[\s\S]*?<\/endnote\s*?>/g;
	var rEndNotes = /<endnotes\s([^>]*?)\s*?\/>/;

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _registry = __webpack_require__(1);

	var registry = _interopRequireWildcard(_registry);

	var rBib = /<bibliography\s*([^>]*?)\s*>([\s\S]*?)<\/bibliography>/;
	var rCitation = /<citation\s([^>]+?)\s?\/>/g;

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
	function getRenderers(markup) {
	  var style = markup.match(rBib).shift().replace(rBib, '$1') || 'basic';
	  var basic = registry.get('styles', 'basic');
	  if (style === 'basic') {
	    return basic;
	  } else {
	    var rndr = registry.get('styles', style) || {};
	    if (!rndr.inText) rndr.inText = basic.inText;
	    if (!rndr.full) rndr.full = basic.full;
	    if (!rndr.order) rndr.order = function () {
	      return 0;
	    };
	    return rndr;
	  }
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
	  var rndr = getRenderers(markup);
	  var refs = matches.map(function (element) {
	    var id = element.replace(rCitation, '$1');
	    var source = bib[id] || { id: id };
	    markup = markup.replace(element, rndr.inText(source));
	    return source;
	  });
	  refs = refs.filter(function (item, index) {
	    return refs.indexOf(item) === index;
	  });
	  var li = refs.sort(rndr.order).map(function (source) {
	    return rndr.full(source);
	  });
	  var bibSection = '<section id="bibliography">\n      <ol class="bibliography-list">' + li.join('') + '\n      </ol>\n    </section>';
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
/* 8 */
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fullLength = __webpack_require__(10);

	var _fullLength2 = _interopRequireDefault(_fullLength);

	var _inText = __webpack_require__(11);

	var _inText2 = _interopRequireDefault(_inText);

	var _order = __webpack_require__(12);

	var _order2 = _interopRequireDefault(_order);

	exports.full = _fullLength2['default'];
	exports.inText = _inText2['default'];
	exports.order = _order2['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Creates a <li> with an id attributed (as a string).
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = full;
	function id(source) {
	  if (source.id) return '<li id="' + source.id + '">';
	  return '<li>';
	}

	/**
	 * Creates a formatted string of the form: 'Last, First. YYYY.'; falls back
	 * to: '"Title", YYYY', or just 'YYYY' if data is missing.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	function authorYear(source) {
	  var author = '';
	  if (source.authors) {
	    author = '' + source.authors;
	  } else if (source.firstname && source.lastname) {
	    author = source.lastname + ', ' + source.firstname;
	  } else if (source.lastname) {
	    author = '' + source.lastname;
	  }
	  if (author && author.slice(-1) !== '.') author += '.';
	  if (author && source.year) return author + ' (' + source.year + ').';
	  if (author) return '' + author;
	  if (source.title && source.year) return '"' + source.title + '". (' + source.year + ').';
	  if (source.year) return source.year + '.';
	  return '';
	}

	/**
	 * Creates a formatted periodical name, vol, num, and pages, string.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	function periodical(source) {
	  if (!source.periodical) return '';
	  var name = '' + source.periodical;
	  var issue = [];
	  if (source.volume) issue.push('Vol. ' + source.volume);
	  if (source.number) issue.push('No. ' + source.number);
	  if (source.page) issue.push('pp. ' + source.page);
	  if (issue.length) {
	    issue = ' (' + issue.join(', ') + ')';
	  } else {
	    issue = '';
	  }
	  return '' + name + issue + '.';
	}

	/**
	 * Creates a formatted conference proceedings, vol, num, and pages string.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	function conference(source) {
	  if (!source.conference) return '';
	  var name = 'Proceedings of <i>' + source.conference + '</i>';
	  var issue = [];
	  if (source.volume) issue.push('Vol. ' + source.volume);
	  if (source.number) issue.push('No. ' + source.number);
	  if (source.page) issue.push('pp. ' + source.page);
	  if (issue.length) {
	    issue = ' (' + issue.join(', ') + ')';
	  } else {
	    issue = '';
	  }
	  return '' + name + issue + '.';
	}

	/**
	 * Prints the publisher name if defined.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	function publisher(source) {
	  if (source.publisher) return source.publisher + '.';
	  return '';
	}

	/**
	 * Creates a formatted title string.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	function title(source) {
	  if (!source.title) return '';
	  if (source.title && !(source.authors || source.lastname)) return '';
	  return source.title + '.';
	}

	/**
	 * Creates a formatted, linked URL string.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	function url(source) {
	  if (!source.url) return '';
	  return '<a href="' + source.url + '">' + source.url + '</a>.';
	}

	/**
	 * Creates a formatted "access date" string.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	function accessed(source) {
	  if (!source.accessed) return '';
	  return 'Accessed: ' + source.accessed + '.';
	}

	/** Our transforms, in APA-like order. */
	var TRANSFORMS = [id, authorYear, title, periodical, conference, publisher, url, accessed];

	/**
	 * Creates a formatted full-length source citation.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */

	function full(source) {
	  var output = '';
	  TRANSFORMS.forEach(function (transform) {
	    output += transform(source) + ' ';
	  });
	  return output + '</li>';
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Creates a formatted in-text source citation.
	 * @function
	 * @param {Object} source
	 * @return {String}
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = inText;

	function inText(source) {
	  var output = '<cite class="in-text-citation">';
	  if (source.id) {
	    output += '<a href="#' + source.id + '">';
	  } else {
	    output += '<a>';
	  }
	  if (source.authors && source.year) {
	    // Author or title
	    output += source.authors + ' ' + source.year;
	  } else if (source.lastname && source.year) {
	    output += source.lastname + ' ' + source.year;
	  } else if (source.title && source.year) {
	    output += '"' + source.title + '" ' + source.year;
	  }
	  return output + '</a></cite>';
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
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

	exports["default"] = function (a, b) {
	  if (a.lastname) a = a.lastname[0].toLowerCase();else if (a.authors) a = a.authors[0].toLowerCase();else if (a.title) a = a.title[0].toLowerCase();

	  if (b.lastname) b = b.lastname[0].toLowerCase();else if (b.authors) b = b.author[0].toLowerCase();else if (b.title) b = b.title[0].toLowerCase();

	  if (a === b) return 0;
	  if ([a, b].sort()[0] === a) return -1;
	  return 1;
	};

	module.exports = exports["default"];

/***/ }
/******/ ]);