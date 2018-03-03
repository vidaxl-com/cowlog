#!/usr/bin/env node

let path = require('path')
let projectRoot = path.join(__dirname, '../../')
let crawlerData = require('../lib/misc/linker/crawler/crawler')(projectRoot)
let data = require('../lib/misc/linker/crawler/service-provider')(crawlerData)
l(data)
