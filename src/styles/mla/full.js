/** This file contains cite formats for major source materials in MLA-style. */
const book = (
  '^AUTHOR. <i>TITLE</i> (TRANSLATOR,+Trans.), (EDITION+ed.) . '+
  'EDITOR+(Ed(s).). LOCATION: PUBLISHER, YEAR. MEDIUM.'
)
const bookChapter = (
  '^AUTHOR. CHAPTER. In<i>TITLE</i>, EDITOR, (TRANSLATOR,+Trans.), '+
  '(EDITION+ed.) . LOCATION: PUBLISHER, YEAR . PAGENUMBERS.'
)
const anthology = (
  '^EDITOR (Ed.). <i>TITLE</i>, (EDITION+ed.) . LOCATION: PUBLISHER, YEAR . '+
  'PAGENUMBERS.'
)
const journal = (
  '^AUTHOR. "TITLE." <i>JOURNAL</i>. VOLUME\.ISSUE (YEAR) : PAGENUMBERS.'
)
const conference = (
  '^AUTHOR. (YEAR). TITLE. In+EDITOR, <i>PROCEEDINGS</i>. Paper+presented+at'+
  '+CONFERENCE ,+CONFLOCATION (PAGENUMBERS). LOCATION: PUBLISHER.'
)
const webpage = (
  '^AUTHOR. "TITLE." <i>WEBSITE</i>, DATE YEAR. MEDIUM. RETRIEVED &lt;URL&gt;.'
)
const newspaper = (
  '^AUTHOR. "TITLE." <i>NEWSPAPER</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'
)
const magazine = (
  '^AUTHOR. "TITLE." <i>MAGAZINE</i>, YEAR, DATE : PAGENUMBERS. MEDIUM.'
)
const lecture = '^AUTHOR. TITLE [FILEFORMAT]. DATE YEAR . &lt;URL&gt;.'
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
