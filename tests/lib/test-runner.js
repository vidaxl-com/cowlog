const blockLogOutput = require('kidnap-console').blockLogOutput

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
    putNewLine: function (string) {
      return '\n' + string + '\n'
    },

    print: function () {
      let returnValue
      if (arguments.length) {
        returnValue = initFunction.apply(this, arguments)
      }

      if (process.env.markdown) {
        if (this.md && this.md.msg && this.md.msg.length) {
          this.md.msg.forEach(function (msgPiece) {
            // console.log(msgPiece);
            let message = ''
            if (msgPiece.text){
              if (msgPiece.before) {
                message += runner.putNewLine(msgPiece.before)
              }
              message += (module.output)
              if (msgPiece.after) {
                message += runner.putNewLine(msgPiece.after)
              }
            } else {
              message += msgPiece
            }
            console.log(message)
          })
        }

        //TODO: remove this part if the generic implementation is done
        if (this.md && this.md.header && this.md.javascript) {
          if (process.env.markdown) {
            if (this.md.header) {
              console.log(`### ${this.md.header}`)
            }

            if (this.md.javascript) {
              console.log('```javascript')
              console.log(this.md.javascript)
              console.log('```')
            }

            console.log('```')
          }
          console.log(module.output)
          if (process.env.markdown) {
            console.log('```')
          }
        }
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
