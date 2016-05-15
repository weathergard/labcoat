import bodyTests from './body'
import endnoteTests from './endnotes'
import citationTests from './citations'
import styleTests from '../styles/tests'
import diagramTests from './diagrams'
import benchmark from './benchmark'

process.stdout.write('\n')
bodyTests()
endnoteTests()
citationTests()
styleTests()
diagramTests()
process.stdout.write('  ✔ All tests passing.')
benchmark()
