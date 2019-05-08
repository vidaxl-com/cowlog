module.exports = (parameters, results) =>
  parameters.arguments('hide', 'allEntries', [[]]).forEach((row) => row.forEach(item => { delete results[item] }))
