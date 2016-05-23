/** This file contains cite formats for all major source materials, in APA-style. */

let book = ''+
  '^AUTHOR. (YEAR). <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER . PAGECOUNT+pgs.'

let bookChapter = ''+
  '^AUTHOR. (YEAR). CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER . pp.+PAGENUMBERS.'

let anthology = ''+
  '^EDITOR (Ed.). (YEAR). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER . '+
  'PAGECOUNT+pgs.'

let journal = ''+
  '^AUTHOR. (YEAR). "TITLE". JOURNAL. VOLUME\(ISSUE). PAGENUMBERS.'

let conference = ''+
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'

let webpage = ''+
  '^AUTHOR. (DATE). TITLE. <i>WEBSITE</i>. Retrieved:+RETRIEVED. From+URL.'

let newspaper = ''+
  '^AUTHOR. (YEAR, DATE). TITLE. <i>NEWSPAPER</i>, pp.+PAGENUMBERS. '+
  'Retrieved+from+URL.'

let magazine = ''+
  '^AUTHOR. (YEAR, DATE). TITLE. <i>MAGAZINE</i>, VOLUME\(ISSUE), PAGENUMBERS.'

let lecture = ''+
  '^AUTHOR. (YEAR). TITLE [FILEFORMAT]. Retrieved+from+URL'

let film = ''+
  '^PRODUCER+(Producer),+&amp; ^DIRECTOR+(Director). (YEAR). TITLE [Motion+'+
  'Picture]. LOCATION: STUDIO.'

let broadcast = ''+
  '^AUTHOR,+&amp; DIRECTOR+(Director). (YEAR). PROGRAMTITLE [Series '+
  'episode]. In+PRODUCER+(Executive+Producer), SERIESTITLE. LOCATION: CHANNEL.'

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
