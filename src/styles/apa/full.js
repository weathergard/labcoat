/** This file contains cite formats for major source materials in APA-style. */
const book = (
  '^AUTHOR. (YEAR). <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER . PAGECOUNT+pgs.'
)
const bookChapter = (
  '^AUTHOR. (YEAR). CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER . pp.+PAGENUMBERS.'
)
const anthology = (
  '^EDITOR (Ed.). (YEAR). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER . '+
  'PAGECOUNT+pgs.'
)
const journal = '^AUTHOR. (YEAR). "TITLE". JOURNAL. VOLUME\(ISSUE). PAGENUMBERS.'
const conference = (
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'
)
const webpage = (
  '^AUTHOR. (DATE). TITLE. <i>WEBSITE</i>. Retrieved:+RETRIEVED. From+URL.'
)
const newspaper = (
  '^AUTHOR. (YEAR, DATE). TITLE. <i>NEWSPAPER</i>, pp.+PAGENUMBERS. '+
  'Retrieved+from+URL.'
)
const magazine = (
  '^AUTHOR. (YEAR, DATE). TITLE. <i>MAGAZINE</i>, VOLUME\(ISSUE), PAGENUMBERS.'
)
const lecture = (
  '^AUTHOR. (YEAR). TITLE [FILEFORMAT]. Retrieved+from+URL'
)
const film = (
  '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+'+
  'Picture]. LOCATION: STUDIO.'
)
const broadcast = (
  '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series '+
  'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.'
)

export {
  book,
  bookChapter,
  anthology,
  journal,
  conference,
  webpage,
  newspaper,
  magazine,
  lecture,
  film,
  broadcast
}
