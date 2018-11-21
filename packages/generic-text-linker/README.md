<!--- destination qa rewrite begin -->
### QA
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
<!--- destination qa rewrite end -->
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=packages%2Fgeneric-text-linker%2Fpackage.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=packages%2Fgeneric-text-linker%2Fpackage.json)
[![HitCount](http://hits.dwyl.com/vidaxl.com/cowlog.svg)](http://hits.dwyl.com/{username}/{project-name})
<!--- 
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
-->

# Installation
```bash
npm install generic-text-linker --save-dev
```

# Motivation
I wanted to have a small generic linker solution for text files so that I can avoid
copy and paste, and use it different kind of automation tasks.


# Usage
I present the usage of the library with the example below

## Example

markdownFile1:
```markdownFile

<!-- source begin-->
Your projects badges, or information you want to share in other files without
copy and paste on your own.
<!-- source end-->

```

markdownFile2:
```markdownFile

<!-- destination begin-->
<!-- destination end-->

```

code:
```javascript 1.6
const {linkerDir} = require('generic-text-linker')
const projectRoot = 'path to the directory where you want to use the linker.'

const source = {
  begin: '<!-- source begin-->',
  end: '<!-- source end-->'
}

const destination = {
  begin: '<!-- destination begin-->',
  end: '<!-- destination end-->'
}

let sourceData = linkerDir(projectRoot, sourceTags.begin, sourceTags.end)

const changedFilesArray = linkerDir(projectRoot, destination.begin, destination.end, sourceData)

```
This will change the content of markdownFile2

# More information
This library helps you find changes modifications between your working and original fixture files. More examples are coming for more information; please check the [tests](./tests/tests)
