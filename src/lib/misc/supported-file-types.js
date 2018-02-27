module.exports = exports = {
  'text/markdown': {
    regex:{
      beginning: '<!---',
      end: '-->',
      regexGetParamaters: /<!--- (.*) -->/gm
    }
  }
}
