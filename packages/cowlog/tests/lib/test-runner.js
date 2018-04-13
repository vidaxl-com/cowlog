const blockLogOutput = require('kidnap-console').blockLogOutput

//todo: Needs refactoring!
const weGotMarkdown = process.env.markdown;

module.exports = exports = function (parameters) {
  parameters = parameters || require('./defaultRunnerParameters')
  let logf = parameters.logf
  let plugin = parameters.plugin
  const cowlog = require('./cowlog-provider')(plugin)

  const initFunction = function () {
    let origArguments = arguments
    if (!module.output) {
      let returnValue = ''
      let output

      if (logf) {
        output = blockLogOutput(() => {
          returnValue = cowlog.logf.apply(this, origArguments)
        })
      }
      if (!logf) {
        output = blockLogOutput(() => {
          returnValue = cowlog.log.apply(this, origArguments)
        })
      }
      module.output = output.stores.log.join('\n')

      return returnValue
    }
  }

  let runner = {
    putNewLine: function (msg, extraString) {
      msg += '\n' + extraString + '\n'
      return msg
    },

    printMarkdown: function (msg) {
      msg.forEach(function (msgPiece) {
        let message = ''
        let thisIsATextObject = msgPiece.text

        if (thisIsATextObject) {
          let beforePiece = msgPiece.before
          if (beforePiece) {
            message = runner.putNewLine(message, beforePiece)
          }
          message += msgPiece.text
          let afterPiece = msgPiece.after
          if (afterPiece) {
            message = runner.putNewLine(message, afterPiece)
          }
        }
        let thisIsAConsoleOutputObject = msgPiece.consoleOutput
        if (thisIsAConsoleOutputObject) {
          message = runner.putNewLine(message, '```')
          message += module.output;
        }
        if (!thisIsATextObject) {
          message += msgPiece
        }
        console.log(message)
      })
    },

    print: function () {
      let returnValue
      if (arguments.length) {
        returnValue = initFunction.apply(this, arguments)
      }

      if (weGotMarkdown) {

        var data = runner.data;
        let weGotMessage = data && data.msg && data.msg.length
        if (weGotMessage) {
          runner.printMarkdown(data.msg)
        }
      }
      if (!weGotMarkdown) {
        console.log(module.output)
      }

      return returnValue
    },

    init: function () {
      return initFunction.apply(this, arguments)
    },

    setTextData: function (data) {
      const dataProvider = function (documentationName, data) {
        let documentation = data[documentationName]
        if(!documentation) {
          documentation = data.default
        }
        return documentation
      }

      runner.data = dataProvider(process.env.documentationName, data)
    }
  }

  return runner;
}
