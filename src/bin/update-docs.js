#!/usr/bin/env node
let messageCreator = require('../lib/misc/create-markdown-examples')
let linker = require('../lib/misc/linker/linker-dir')
let path = require('path')

let callback = function (output) {
  let projectRoot = path.join(__dirname, '../../')
  linker(projectRoot,
                     '<!--- example begin -->', '<!--- example end -->', output)
}

messageCreator(
    [
      'basic', 'basic-clean', 'array', 'function', 'basic-object', 'logf',
      'last',
    ], callback)
