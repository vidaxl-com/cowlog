<!--- destination qa rewrite begin -->
### QA
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
<!--- destination qa rewrite end -->
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=packages%2Fdirectory-fixture-provider%2Fpackage.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=packages%2Fdirectory-fixture-provider%2Fpackage.json)
<!---
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
-->

# Installation
```bash
npm install directory-fixture-provider --save-dev
```

# Motivation

..comes to write something like this, when your library that work with files and directories and you want to test the
results.

# Usage
Directory-fixture-provider has its own limited DSL that gives you a few options for now, but can be handy to know about.
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
const dfp =  require('directory-fixture-provider')
const fixtureDirectoryProvider = dfp(fixturesRoot)()
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

This is how you start working with the tool, but the real fun starts.
So you receive all files and subdirectories of the fixtures that subset what
you were requesting too so in the example above the directory2 will be given back.

We have a random part of the path that is unique per fixture provider, so if you
need clean data, create another directory-fixture-provider.

### Sometimes you need it play more deterministic

Imagine a situation, when you are testing a small application that uses your
framework, and you want to test your frameworks behaviour in the wild.
In this case, you have your sample application, and you want to have installed
its the dependencies,
but the package.json does not change too often. In this case, it was nice
overwriting the files, so you don't need that random part in the deployed directory.

`const fixtureDirectoryProvider = dfp(fixturesRoot)('permanent')()`

If you like the concept that your temporary files are in a fixed place, but rather you
would empty the destination directory first you type:
`const fixtureDirectoryProvider = dfp(fixturesRoot)('permanent','cleanFirst')()`

## Check if your data has changed

```javascript 1.6
const fixtureDirectoryProvider = dfp(fixturesRoot)()
const fixtureData = fixtureDirectoryProvider.get('./')
const fixtureDir = fixtureData.dir
// Work with the files
// add/remove/modify files, and you will get relevant info about them

fixtureData.getStatus().changed

// true if something is changed.
```
### changeTotals
```javascript 1.6
fixtureData.getStatus().changeTotals

// gives you the number of files changed
```

If a new file is added, deleted or an existing changed each count as a change
here.

### changeNumbers
```javascript 1.6
fixtureData.getStatus().changeNumbers

/*
Returns an object like this:
{
  deleted: 0
  changed: 0
  new: 0
}
 */

```

Where it tells you how many files changed, deleted or new

If a file is **deleted** it will increase the **changed** data tag too.

# Milestones
Create an excellent diff module for the getStatus resulting object.

# More information
This library helps you find changes modifications between your working and original fixture files.
More examples are coming for more information, please check the [tests](./tests/tests/unit.js)
