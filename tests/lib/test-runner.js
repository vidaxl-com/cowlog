const blockLogOutput = require('kidnap-console').blockLogOutput
const isObject = require('is-object');
const isString = require('is-string');
module.exports = exports = function (parameters) {
  parameters = parameters || require('./defaultRunnerParameters')

  let logf = parameters.logf
  let plugin = parameters.plugin

  const cowlog = require('./cowlog-provider')(plugin)

  let initFunction = function () {
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
          message += module.output
          message = runner.putNewLine(message, '```')
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
      let weGotMarkdown = process.env.markdown;
      if (weGotMarkdown) {
        let weGotMessage = this.md && this.md.msg && this.md.msg.length
        if (weGotMessage) {
          runner.printMarkdown(this.md.msg)
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
      this.md = data
    }
  }

  return runner;
}
