<!--- destination qa rewrite begin -->
### QA
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/github/vidaxl-com/cowlog/badges/score.svg)](https://www.bithound.io/github/vidaxl-com/cowlog)
[![bitHound Dependencies](https://www.bithound.io/github/vidaxl-com/cowlog/badges/dependencies.svg)](https://www.bithound.io/github/vidaxl-com/cowlog/master/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
<!--- 
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
-->
<!--- destination qa rewrite end -->

# Installation
```bash
npm install directory-fixture-provider --save-dev
```

# Motivation
When your library work with files and directories and you want to test it


# Usage

## Basics

```javascript 1.6
const fixturesRoot = '/paht/to/your/fixture/directories/files'
/*
contains files and direcories for examnple:
- file-a.js
- file-b.js
- directory1/file-c.js
- directory2/contains-a-lot-of-files.js
- directory2/directory3/contains-a-lot-of-files-as-well.js

*/
const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)
const fixtureData = fixtureDirectoryProvider.get('directory2') 

// fixtureData contains an object where
/*
{ dir: '/tmp/directory-fixture-provider-destination/KzXwBFDdtAmh/',
  fixturePath: '/home/it/dev/misc/cowlog/packages/directory-fixture-provider/tests/directory-fixtures/',
  getFixtureFiles: [Function: getFixtureFiles],
  getDestinationFiles: [Function: getDestinationFiles],
  getStatus: [Function: getStatus],
  getFixtureContent: [Function] }
}
 */
```

This is how you start working with the tool, but the real fun just starts.
So you receive all files and subdirectories of the fixtures that subset what 
you were requesting too so in the example above the directory2 will be given back.

We have a random part of the path that is unique per fixture provider, so if you
need clean data, just create another directory-fixture-provider.

### Check if your data has changed

```javascript 1.6
const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)
const fixtureData = fixtureDirectoryProvider.get('./')
const fixtureDir = fixtureData.dir
// Work with the files

add/remove/modify files, and you will get relevant info about them

fixtureData.getStatus().changed

// true if something is changed.
```
This library helps you find changes modifications between your working and original fixture files. More examples are coming for more information, please check the [tests](./tests/tests/unit.js)
