let beginningMarkdown = '<!---'
let endMarkdown = '-->'
module.exports = exports = {
  markdown: {
    regex: {
      beginning: beginningMarkdown,
      end: endMarkdown,
      regexLine: new RegExp(
        `(\\s)*${beginningMarkdown} example begin ${endMarkdown}(\\s)*\\n`),
      regexParameters: new RegExp(
        `${beginningMarkdown} (.*) ${endMarkdown}`)
    }
  }
}
