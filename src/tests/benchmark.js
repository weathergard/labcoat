const fs = require('fs')
const assert = require('assert')
const labcoat = require('../../build')
const HTML = fs.readFileSync(__dirname + '/../../benchmark.html', 'utf8')

module.exports = function () {
  let perf = process.hrtime()
  let output = labcoat(HTML)
  let duration = process.hrtime(perf)
  process.stdout.write(
`

  Benchmark:
    Input: ${HTML.length} characters
    Output: ${output.length} characters
    Duration: ${Math.round(duration[1] * 1e-3)}μs (${(duration[1] * 1e-6)}ms)

`
  )
  assert(/failed/.test(output) === false, 'Transpilation should not fail.')
}
