let rArticle = /<article/g

export default function (markup) {
  return markup.replace(rArticle, '<article data-transpiled')
}
