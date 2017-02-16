const INVALID_TYPE = 'There is no registry pool of the specified type.'
const INVALID_NAME = 'You must provide a name to register a value.'
const INVALID_VALUE = 'You must register a value.'
const reg = {styles: {}}

export function set(type, name, value) {
  if (!type || !reg[type]) throw new Error(INVALID_TYPE)
  if (!name) throw new Error(INVALID_NAME)
  if (!value) throw new Error(INVALID_VALUE)
  reg[type][name] = value
}

export function get(type, name) {
  if (typeof reg[type] === 'undefined') throw new Error(INVALID_TYPE)
  if (typeof reg[type][name] === 'undefined') return null
  return reg[type][name]
}
