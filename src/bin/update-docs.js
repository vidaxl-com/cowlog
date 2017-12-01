#!/usr/bin/env node
let messageCreator = require('../lib/misc/create-markdown-examples')
let linker = require('../lib/misc/linker/linker-dir')
let path = require('path')
let callback = function (output) {
  let projectRoot = path.join(__dirname, '../../')

// console.log(projectRoot, "GGGGGGGG", "AA")
  linker(projectRoot, '<!--- example begin -->', '<!--- example end -->', output)
// linker(projectRoot, '<!--- example begin -->', '<!--- example end -->', "HHHHHHHHH")
  console.log(output, "FFFF", '++++++++++++')
}

let result = messageCreator(['basic', 'basic-clean', 'array', 'function'], callback)