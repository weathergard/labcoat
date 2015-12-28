import articleTests from '../tests/article'
import endnoteTests from '../tests/endnotes'
import citationTests from '../tests/citations'
import diagramTests from '../tests/diagrams'
import benchmark from '../tests/benchmark'

process.stdout.write('\n')
articleTests()
endnoteTests()
citationTests()
diagramTests()
process.stdout.write('  ✔ All tests passing.')
benchmark()
