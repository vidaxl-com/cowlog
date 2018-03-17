# installation
## Installation
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
{
  dir: 'the directory where your fixtures are, you can start working with these files'
}
 */
```

This is how you start working with the tool, but the real fun just starts.
So you receive all files and sub directories of the fixtures that subset what 
you was requesting too so at the example above the directory2 will be given back.

We have a random part of the path that is unique per fixture provider, so if you
need clean data, just create another directory-fixture-provider.

### Check if you data has changed

```javascript 1.6
const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)
const fixtureData = fixtureDirectoryProvider.get('./')

 


```
