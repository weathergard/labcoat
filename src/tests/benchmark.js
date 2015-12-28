import fs from 'fs'
import assert from 'assert'
import labcoat from '../../build'
const HTML = fs.readFileSync(__dirname + '/../../benchmark.html', 'utf8')

export default function () {
  let perf = process.hrtime()
  let output = labcoat(HTML)
  let duration = process.hrtime(perf)
  process.stdout.write(
`

  Benchmark:
    Input: ${HTML.length} characters
    Output: ${output.length} characters
    Duration: ${(duration[1] * 1e-6)}ms

`
  )
  assert(/transpilation failed/.test(output) === false, 'Transpilation should not fail.')
}
