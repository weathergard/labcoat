/** This file contains cite formats for all major source materials, in MLA-style. */

let book = ''+
  '^AUTHOR. <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER, YEAR. MEDIUM.'

let bookChapter = ''+
  '^AUTHOR. CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER, YEAR . PAGENUMBERS.'

let anthology = ''+
  '^EDITOR. <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER, YEAR . '+
  'PAGENUMBERS.'

let journal = ''+
  '^AUTHOR. "TITLE." <i>JOURNAL</i>. VOLUME\.ISSUE (YEAR) : PAGENUMBERS.'

let conference = ''+
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'

let webpage = ''+
  '^AUTHOR. "TITLE." <i>WEBSITE</i>, DATE YEAR. MEDIUM. RETRIEVED &lt;URL&gt;.'

let newspaper = ''+
  '^AUTHOR. "TITLE." <i>NEWSPAPER</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'

let magazine = ''+
  '^AUTHOR. "TITLE." <i>MAGAZINE</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'

let lecture = ''+
  '^AUTHOR. TITLE [FILEFORMAT]. DATE YEAR . &lt;URL&gt;.'

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
