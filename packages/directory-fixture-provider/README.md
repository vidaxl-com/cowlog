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

This is how you start working with the tool, but the real fun starts.
So you receive all files and subdirectories of the fixtures that subset what 
you were requesting too so in the example above the directory2 will be given back.

We have a random part of the path that is unique per fixture provider, so if you
need clean data, create another directory-fixture-provider.

## Check if your data has changed

```javascript 1.6
const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)
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
This library helps you find changes modifications between your working and original fixture files. More examples are coming for more information; please check the [tests](./tests/tests/unit.js)
