#!/usr/bin/env node
const messageCreator = require('../lib/juggler/create-markdown-examples')
// let linkerDir = require('../lib/juggler/linker/linker-dir')
const {linkerDir} = require('generic-text-linker')
const path = require('path')
const projectRoot = path.join(__dirname, '../../../')

const readmeMdUpdate = function (output) {
  console.log(output,"FFF",projectRoot)
  linkerDir(projectRoot,
    '<!--- example begin -->', '<!--- example end -->', output)
}
const docsUpdate = function (output) {
  // linkerDir(projectRoot,
  //   '<!--- docs functionality begin -->', '<!--- docs functionality end -->', output)
  // console.log(output)
}

messageCreator(
  [
    'basic'
  ], readmeMdUpdate, '```', '```' )

messageCreator(
  [
    'basic', 'basic-clean', 'array', 'function', 'basic-object', 'logf',
    'last', 'lasts', 'die'
  ], docsUpdate, 'logging_functionality')

require('./update-docs-static-parts')
