#!/usr/bin/env node
// let messageCreator = require('../lib/misc/create-markdown-examples')
let path = require('path')
let projectRoot = path.join(__dirname, '../../')
require('../lib/misc/linker/crawler/crawler')(projectRoot)
