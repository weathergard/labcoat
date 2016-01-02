/**
 * Creates a <li> with an id attributed (as a string).
 * @function
 * @param {Object} source
 * @return {String}
 */
function id(source) {
  if (source.id) return `<li id="${source.id}">`
  return '<li>'
}

/**
 * Creates a formatted string of the form: 'Last, First. YYYY.'; falls back
 * to: '"Title", YYYY', or just 'YYYY' if data is missing.
 * @function
 * @param {Object} source
 * @return {String}
 */
function authorYear(source) {
  let author = ''
  if (source.authors) {
    author = `${source.authors}`
  } else if (source.firstname && source.lastname) {
    author = `${source.lastname}, ${source.firstname}`
  } else if (source.lastname) {
    author = `${source.lastname}`
  }
  if (author && source.year) return `${author}. ${source.year}.`
  if (author) return `${author}.`
  if (source.title && source.year) return `"${source.title}", ${source.year}.`
  if (source.year) return `${source.year}.`
  return ''
}

/**
 * Creates a formatted title string.
 * @function
 * @param {Object} source
 * @return {String}
 */
function title(source) {
  if (!source.title) return ''
  if (source.title && !(source.authors || source.lastname)) return ''
  return `&#8220;${source.title}&#8221;.`
}

/**
 * Creates a formatted, linked URL string.
 * @function
 * @param {Object} source
 * @return {String}
 */
function url(source) {
  if (!source.url) return ''
  return (
    `<a href="${source.url}">${source.url}</a>.`
  )
}

/**
 * Creates a formatted "access date" string.
 * @function
 * @param {Object} source
 * @return {String}
 */
function accessed(source) {
  if (!source.accessed) return ''
  return `Accessed: ${source.accessed}.`
}

/** Our transforms, in APA-like order. */
const TRANSFORMS = [
  id,
  authorYear,
  title,
  url,
  accessed
]

/**
 * Creates a formatted full-length source citation.
 * @function
 * @param {Object} source
 * @return {String}
 */
export default function full (source) {
  let output = ''
  TRANSFORMS.forEach((transform) => {
    output += transform(source) + ' '
  })
  return output + '</li>'
}
