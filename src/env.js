/**
 * Determines whether environment is Node.js or a web browser.
 * @function
 * @return {String}
 */
let environment = (function () {
  if (new Function(
    "try{return this==global}catch(e){}"
  )()) {
    return 'node'
  } else {
    return 'browser'
  }
}())

export default environment
