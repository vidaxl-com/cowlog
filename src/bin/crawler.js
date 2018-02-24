#!/usr/bin/env node
// let messageCreator = require('../lib/misc/create-markdown-examples')
let path = require('path')
let projectRoot = path.join(__dirname, '../../')
let crawler = require('../lib/misc/linker/crawler/crawler')(projectRoot)
