const alphabet = [
  '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]

function latinNumbering(int) {
  if (typeof int !== 'number') return
  return alphabet[int % 26]
}

latinNumbering.class = 'latin-numbering'
latinNumbering.style = 'list-style:lower-latin;'

export default latinNumbering
