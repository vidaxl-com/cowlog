let beginningMarkdown = '<!---'
let endMarkdown = '-->'
module.exports = exports = {
  "text/markdown": {
    regex: {
      beginning: beginningMarkdown,
      end: endMarkdown,
      regexGetParamaters:new RegExp(
        `\\s*${beginningMarkdown} (.*) ${endMarkdown}\\s*\\n`, 'gm')
    }
  }
}
