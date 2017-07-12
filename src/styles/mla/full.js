'use strict'

exports.book = (
  '^AUTHOR. <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER, YEAR. MEDIUM.'
)
exports.bookChapter = (
  '^AUTHOR. CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER, YEAR . PAGENUMBERS.'
)
exports.anthology = (
  '^EDITOR (Ed.). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER, YEAR . '+
  'PAGENUMBERS.'
)
exports.journal = (
  '^AUTHOR. "TITLE." <i>JOURNAL</i>. VOLUME\.ISSUE (YEAR) : PAGENUMBERS.'
)
exports.conference = (
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'
)
exports.webpage = (
  '^AUTHOR. "TITLE." <i>WEBSITE</i>, DATE YEAR. MEDIUM. RETRIEVED &lt;URL&gt;.'
)
exports.newspaper = (
  '^AUTHOR. "TITLE." <i>NEWSPAPER</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'
)
exports.magazine = (
  '^AUTHOR. "TITLE." <i>MAGAZINE</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'
)
exports.lecture = '^AUTHOR. TITLE [FILEFORMAT]. DATE YEAR . &lt;URL&gt;.'
exports.film = (
  '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+'+
  'Picture]. LOCATION: STUDIO.'
)
exports.broadcast = (
  '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series '+
  'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.'
)
