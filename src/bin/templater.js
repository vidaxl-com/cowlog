#!/usr/bin/env node

let path = require('path')
let projectRoot = path.join(__dirname, '../../')
let crawlerData = require('../lib/misc/crawler/parser')(projectRoot)

let templater = require('../lib/misc/templater/templater')(projectRoot)
let parsedData = require('../lib/misc/crawler/service-provider')
                                                        (crawlerData, templater)
