require('../../../index')()
const supportedFileTypes = require('../supported-file-types')
const linker = require('../linker/linker-dir')

module.exports = exports = function(rootFolder) {
  return function(data) {
    let {services} = data
    let {source} = services

    source.forEach(function(parameters) {
      Object.keys(supportedFileTypes).forEach(function(supportedFileTypeIndex) {
        let supportedFileTypeDetails =
                                      supportedFileTypes[supportedFileTypeIndex]
        let sourceDelimiters = module.createDelimiters
                                ('source', supportedFileTypeDetails, parameters)
        let sourceData = linker(rootFolder, sourceDelimiters.beginning,
                                                           sourceDelimiters.end)
        let destinationDelimiters = module.createDelimiters
                           ('destination', supportedFileTypeDetails, parameters)
        // l(rootFolder, destinationDelimiters, sourceDelimiters, sourceData)('die')

        let changedFiles = linker(
          rootFolder,
          destinationDelimiters.beginning,
          destinationDelimiters.end,
          sourceData)
        if(changedFiles)l(changedFiles, destinationDelimiters, sourceDelimiters, sourceData, 'fff')
      })
    })
  }
}

module.createDelimiters = function(type, supportedFileType, parameters) {
  let beginning = supportedFileType.regex.beginning;
  let end = supportedFileType.regex.end;
  return l(supportedFileType, {
    beginning: `${beginning} ${type} ${parameters} begin ${end}`,
    end: `${beginning} ${type} ${parameters} end ${end}`,
  })('return')
}
