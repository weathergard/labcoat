'use strict'

exports.book = (
  '^AUTHOR. (YEAR). <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER . PAGECOUNT+pgs.'
)
exports.bookChapter = (
  '^AUTHOR. (YEAR). CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER . pp.+PAGENUMBERS.'
)
exports.anthology = (
  '^EDITOR (Ed.). (YEAR). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER . '+
  'PAGECOUNT+pgs.'
)
exports.journal = '^AUTHOR. (YEAR). "TITLE". JOURNAL. VOLUME\(ISSUE). PAGENUMBERS.'
exports.conference = (
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'
)
exports.webpage = (
  '^AUTHOR. (DATE). TITLE. <i>WEBSITE</i>. Retrieved:+RETRIEVED. From+URL.'
)
exports.newspaper = (
  '^AUTHOR. (YEAR, DATE). TITLE. <i>NEWSPAPER</i>, pp.+PAGENUMBERS. '+
  'Retrieved+from+URL.'
)
exports.magazine = (
  '^AUTHOR. (YEAR, DATE). TITLE. <i>MAGAZINE</i>, VOLUME\(ISSUE), PAGENUMBERS.'
)
exports.lecture = (
  '^AUTHOR. (YEAR). TITLE [FILEFORMAT]. Retrieved+from+URL'
)
exports.film = (
  '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+'+
  'Picture]. LOCATION: STUDIO.'
)
exports.broadcast = (
  '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series '+
  'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.'
)
