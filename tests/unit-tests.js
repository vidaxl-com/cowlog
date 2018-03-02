/* eslint-env mocha */
require('./lib/test-common')
const assert = require('chai').assert
const path = require('path')
const tmpDir = path.join(__dirname, '../tmp/')
const mockData = require('./mockData')
const fs = require('fs')
const stlc = require('./lib/string-to-line-increasing-checker')
const sttlm = require('../src/lib/misc/linker/substing-to-line-mapper')
const copyFileSync = require('fs-copy-file-sync')
const _ = require('lodash')
const appContainer = require(`../src/app/container`)()
const readmeFileName = appContainer.readmeFileName
const linker = require('../src/lib/misc/linker/linker')
require('../src/index')()

const expect = require('chai').expect
require('chai').should()

describe('lib unit tests', function () {

  this.timeout(100000)

  describe('hash-creator', function () {
    it('shall provide a hash', function () {
      let hashCreator = appContainer['hash-creator']
      let hash = hashCreator('abc')
      hash.should.be.a('string')
      var hexCheck = new RegExp(/^[0-9A-Fa-f]+$/)
      expect(hexCheck.test(hash)).to.equal(true)
      hash.should.to.equal(mockData.abcHash)
    })
  })

  describe('logfile-creator', function () {
    it('shall create a logfile', function () {
      let logFileCreator = require(`../src/lib/logfile-creator`)(tmpDir)
      let abcHashPath = logFileCreator('abc')
      abcHashPath.should.be.a('string').that.does.include('/tmp/')
        .and.that.does.include('/7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
        .and.that.does.include('/ba/')
        .and.that.does.include('_.log')
      assert(fs.existsSync(abcHashPath), 'logfile does not exists')
    })

    it('shall create a logfile with a different @extension', function () {
      let logFileCreator = require(`../src/lib/logfile-creator`)(tmpDir)
      let abcHashPath = logFileCreator('abc', '.js')
      abcHashPath.should.be.a('string').that.does.include('/tmp/')
        .and.that.does.include('.js')
    })
  })

  describe('plugin-loader', function () {
    it('shall test loading plugins passed as objects form the config', function () {
      let parameters = 'default'
      let calculatedParameters = require(`../src/app/configParser/configParser`)(parameters)
      calculatedParameters.plugins = [require(`../src/plugins/logDetails`)]
      // // const appContainer =
      require(`../src/app/container`)(calculatedParameters)
    })

    it('shall test loading plugins', function () {
      let parameters = 'default'
      let calculatedParameters = require(`../src/app/configParser/configParser`)(parameters)
      calculatedParameters.plugins = ['logDetails']
      // const appContainer =
      require(`../src/app/container`)(calculatedParameters)
    })
  })

  describe('@linker', function () {
    let linker = require('../src/lib/misc/linker/linker')
    it('test liner', function () {
      let result = linker(`
      bla-bla
      AAA
      ---
      BBB
      
      alb-alb

      `, 'AAA', 'BBB', '+++')
      let {returnData} = result

      let {changed} = result
      expect(changed.all).to.equal(true)
      expect(changed.withoutWhiteSpaces).to.equal(true)

      returnData.should.be.a('string').that.does.not.include('---')
      returnData.should.be.a('string').that.does.include('+++')
      stlc(returnData, ['bla-bla', 'AAA', '+++', 'BBB', 'alb-alb'])
    })

    it('test linker with more tags', function () {
      let linker = require('../src/lib/misc/linker/linker')
      let result = linker(`
      bla-bla
      AAA
      ---
      BBB
      
      AAA
      ---
      BBB
      
      alb-alb

      `, 'AAA', 'BBB', '+++')
      let {returnData} = result

      let {changed} = result
      expect(changed.all).to.equal(true)
      expect(changed.withoutWhiteSpaces).to.equal(true)

      returnData.should.be.a('string').that.does.not.include('---')
      expect(sttlm(returnData, '+++')).to.have.property('length', 2)
      expect(sttlm(returnData, 'AAA')).to.have.property('length', 2)
      expect(sttlm(returnData, 'BBB')).to.have.property('length', 2)

      stlc(returnData, ['bla-bla', 'AAA', '+++', 'BBB', 'alb-alb'])

    })

    it('test linker with more tags (no change)', function () {
      let linker = require('../src/lib/misc/linker/linker')
      let result = linker(`
      bla-bla
      AAA
      +++
      BBB
      
      AAA
      +++
      BBB
      
      alb-alb

      `, 'AAA', 'BBB', '+++')
      let {returnData} = result

      let {changed} = result
      expect(changed.all).to.equal(true)
      expect(changed.withoutWhiteSpaces).to.equal(false)

      expect(sttlm(returnData, '+++')).to.have.property('length', 2)
      expect(sttlm(returnData, 'AAA')).to.have.property('length', 2)
      expect(sttlm(returnData, 'BBB')).to.have.property('length', 2)

      stlc(returnData, ['bla-bla', 'AAA', '+++', 'BBB', 'alb-alb'])
    })

    it('test @linker-return with more tags', function () {
      let linker = require('../src/lib/misc/linker/linker')
      let result = linker(`
      bla-bla
      AAA
      ---
      BBB
      
      AAA
      ---
      BBB
      
      alb-alb

      `, 'AAA', 'BBB')
      let {returnData} = result

      let {changed} = result
      expect(changed.all).to.equal(false)

      returnData.should.be.a('string').that.does.include('---')
      returnData.should.be.a('string').that.does.not.include('AAA')
    })

    it('no opening tag', function () {
      let linker = require('../src/lib/misc/linker/linker')
      expect(function () {
        linker(`
              bla-bla
              ---
              BBB
              
              alb-alb
        
              `, 'AAA', 'BBB', '+++')
      }).to.throw('The number linker closing tags and starting tags are not matching')

    })

    it('no closing tag', function () {
      let linker = require('../src/lib/misc/linker/linker')
      expect(function () {
        linker(`
        bla-bla
        AAA
        ---
        
        alb-alb
  
        `, 'AAA', 'BBB', '+++')
        }).to.throw('The number linker closing tags and starting tags are not matching')
    })

    describe('test @linker-file', function () {
      it('changed content', function () {
        let linker = require('../src/lib/misc/linker/linker-file')
        let tmpFile = path.join(process.cwd(), 'tmp', readmeFileName)
        copyFileSync(path.join(process.cwd(), readmeFileName), tmpFile)
        let result = linker(tmpFile, '<!--- example begin -->', '<!--- example end -->', '+++')
        result.should.be.a('string').that.does.include('+++')
          .and.does.not.include('oO')
      })
      it('not changed content', function () {
        let linker = require('../src/lib/misc/linker/linker-file')
        let tmpFile = path.join(process.cwd(), 'tmp', readmeFileName)
        copyFileSync(path.join(process.cwd(), readmeFileName), tmpFile)
        let result = linker(tmpFile, '<!-- example begin -->', '<!-- example end -->', '+++')
        expect(result).to.equal('')
      })
      it('return selected content', function () {
        let linker = require('../src/lib/misc/linker/linker-file')
        let tmpFile = path.join(process.cwd(), 'tmp', readmeFileName)
        copyFileSync(path.join(process.cwd(), readmeFileName), tmpFile)
        let oldCotent = fs.readFileSync(tmpFile, {encoding: 'utf8'})
        let result = linker(tmpFile, '<!--- example begin -->', '<!--- example end -->')
        let newCotent = fs.readFileSync(tmpFile, {encoding: 'utf8'})
        newCotent.should.be.equal(oldCotent)
        result.should.be.a('string').that.does.include('require(\'cowlog\')()')
        oldCotent.should.be.a('string').that.does.include(result)
      })
    })

    describe('test @linker-dir', function () {

      it('test @linker-dir-template', function () {
        let linker = require('../src/lib/misc/linker/linker-dir')
        let tmpdir = path.join(process.cwd(), 'tmp')
        let tmpFile = path.join(tmpdir, readmeFileName)
        copyFileSync(path.join(process.cwd(), readmeFileName), tmpFile)
        copyFileSync(path.join(process.cwd(), readmeFileName), tmpFile + 'copy')
        let results = linker(tmpdir, '<!--- example begin -->', '<!--- example end -->', '+++***---')
        let keys = Object.keys(results)
        expect(keys.length).to.equal(2)
        results[keys[0]].should.include('+++***---')
      })

      it('test @linker-dir-return', function () {
        let linker = require('../src/lib/misc/linker/linker-dir')
        let tmpdir = path.join(process.cwd(), 'tmp')
        let tmpFile = path.join(tmpdir, readmeFileName)
        copyFileSync(path.join(process.cwd(), readmeFileName), tmpFile)
        copyFileSync(path.join(process.cwd(), readmeFileName), tmpFile + 'copy')
        let oldCotent = fs.readFileSync(tmpFile, {encoding: 'utf8'})
        let results = linker(tmpdir, '<!--- example begin -->', '<!--- example end -->')
        let newCotent = fs.readFileSync(tmpFile, {encoding: 'utf8'})
        newCotent.should.be.equal(oldCotent)
        //todo: test it!
        // expect(keys.length).to.equal(1)
        // results.should.include('require(\'cowlog\')()')
      })

    })
  })
})
