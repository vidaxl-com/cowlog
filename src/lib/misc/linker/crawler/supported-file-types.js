let beginningMarkdown = '<!---'
let endMarkdown = '-->'
module.exports = exports = {
  "text/markdown": {
    regex: {
      beginning: beginningMarkdown,
      end: endMarkdown,
      regexLine: new RegExp(
        `(\\s)*${beginningMarkdown} .* ${endMarkdown}(\\s)*\\n`, 'm'),
      regexParameters: new RegExp(
        `${beginningMarkdown} (.*) ${endMarkdown}`)
    }
  }
}
