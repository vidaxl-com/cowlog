#!/usr/bin/env node

let path = require('path')
let dir = process.cwd()
let projectRoot = path.join(dir)
// let argv = require('minimist')(process.argv.slice(2))
// if (!argv._.length) {
// }

require('../lib/misc/doc-crawler/doc-crawler')(projectRoot)
