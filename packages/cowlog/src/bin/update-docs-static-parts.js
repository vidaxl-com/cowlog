#!/usr/bin/env node
let { linkerDir } = require('generic-text-linker')

let path = require('path')

let staticUpdate = function () {
  let projectRoot = path.join(__dirname, '../../../../')

  let src = linkerDir(projectRoot, '<!--- source qa rewrite begin -->', '<!--- source qa rewrite end -->')
  linkerDir(projectRoot,
    '<!--- destination qa rewrite begin -->', '<!--- destination qa rewrite end -->',
    src)
}

staticUpdate()
