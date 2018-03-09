let beginningMarkdown = '<!---'
let endMarkdown = '-->'

let beginningJavascript = '//cl---'
let endJavascript = '--//'

const tagFactory = function (content, type = 'text/markdown', tagType = 'begin') {
  let regex = exports[type].regex

  return `${regex.beginning} ${content} ${tagType} ${regex.end}`
}

const tagsFactory = function (type = 'text/markdown') {
  return function (content) {
    let begin = tagFactory(content, type, 'begin')
    let end = tagFactory(content, type, 'end')

    return {
      begin,
      end
    }
  }
}

module.exports = exports = {
  'text/markdown': {
    regex: {
      beginning: beginningMarkdown,
      end: endMarkdown,
      regexGetParamaters:new RegExp(
        `\\s*${beginningMarkdown} (.*) ${endMarkdown}\\s*\\n`, 'gm')
    },

    tagsFactory: tagsFactory('text/markdown')
  },

  'application/javascript': {
    regex: {
      beginning: beginningJavascript,
      end: endJavascript,
      // regexGetParamaters:new RegExp(
      //   `\\s*${beginningJavascript} (.*) ${endJavascript}\\s*\\n`, 'gm')
      regexGetParamaters: /\s\/\/cl--- (.*) --\/\/*\n/gm
    },

    tagsFactory: tagsFactory('application/javascript')
  }
}
