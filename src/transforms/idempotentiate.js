let rMain = /<main/g

export default function (markup) {
  return markup.replace(rMain, '<main data-transpiled')
}
