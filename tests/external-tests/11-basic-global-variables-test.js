const cowlog = require('../lib/cowlog-provider')(false, 'clean')

if (cowlog.log.toString() === l.toString()) {
  console.log('true')
}
if (cowlog.logf.toString() === lf.toString()) {
  console.log('true')
}
