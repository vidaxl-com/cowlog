#!/usr/bin/env node
let messageCreator = require('../lib/juggler/create-markdown-examples')
// let linkerDir = require('../lib/juggler/linker/linker-dir')
let {linkerDir} = require('generic-text-linker')

let path = require('path')

let readmeMdUpdate = function (output) {
  let projectRoot = path.join(__dirname, '../../')
  linkerDir(projectRoot,
    '<!--- example begin -->', '<!--- example end -->', output)
}

let docsUpdate = function (output) {
  let projectRoot = path.join(__dirname, '../../')
  linkerDir(projectRoot,
    '<!--- docs functionality begin -->', '<!--- docs functionality end -->', output)
}

messageCreator(
  [
    'basic'
  ], readmeMdUpdate, 'readme')

messageCreator(
  [
    'basic', 'basic-clean', 'array', 'function', 'basic-object', 'logf',
    'last', 'lasts', 'die'
  ], docsUpdate, 'logging_functionality')

require('./update-docs-static-parts')
