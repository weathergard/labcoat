const key = [
  '','c','cc','ccc','cd','d','dc','dcc','dccc','cm',
  '','x','xx','xxx','xl','l','lx','lxx','lxxx','xc',
  '','i','ii','iii','iv','v','vi','vii','viii','ix'
]

function romanNumbering(num) {
  if (typeof num !== 'number') return ''
  const digits = num.toString().split('')
  let roman = ''
  let i = 3
  while (i--) {
    roman = (key[+digits.pop() + (i * 10)] || '') + roman
  }
  return Array(+digits.join('') + 1).join('m') + roman
}

romanNumbering.class = 'roman-numbering'
romanNumbering.style = 'list-style:lower-roman;'
export default romanNumbering
