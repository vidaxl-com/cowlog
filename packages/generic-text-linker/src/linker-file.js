const fs = require('fs')
const linker = require('./linker')
const Bottle = require('bottlejs')
const mime = require('mime-types')

// const debug = require('debug')('linker-file')

module.exports = exports = function (file, beginning, closing, newValue = null) {
  // let string = ''
  // if(cache.has(file)){
  //   string = cache.get(file)
  // }
  // else
  // {
  let string = fs.readFileSync(file, { encoding: 'utf8' })
  // cache.set(file, string)
  // debug(`hit: ${file}`)
  // }

  let linkerResult = {}
  try {
    linkerResult = linker(string, beginning, closing, newValue)
  } catch (e) {
    throw String(`file: ${file} \n ${e}`)
  }
  /* istanbul ignore else */
  if (linkerResult.meta.changed.all) {
    fs.writeFileSync(file, linkerResult.returnData, { encoding: 'utf8' })
  }
  const fileInfoServices = new Bottle('fileInfoServices')
  let fileInfo = fileInfoServices.container
  linkerResult.meta.fileInfo = fileInfo

  fileInfoServices.service('path', function () {
    let path = String(file)

    return path
  })

  fileInfoServices.service('type', function (path) {
    let type = String(mime.lookup(path.toString()))

    return type
  }, 'path')

  return linkerResult
}
