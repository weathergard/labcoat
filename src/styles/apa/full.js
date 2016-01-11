let book = ''+
  '^AUTHOR. (YEAR) . <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER . PAGECOUNTpgs.'

let bookChapter = ''+
  '^AUTHOR. (YEAR) . CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER . pp.+PAGENUMBERS.'

let anthology = ''+
  '^EDITOR. (YEAR) . <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER . PAGECOUNT+pgs.'

export {book, bookChapter, anthology}
