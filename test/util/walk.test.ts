import {expect} from '@oclif/test'
import * as mockfs from 'mock-fs'

import walk from '../../src/util/walk'

describe('walk', () => {
  afterEach(() => {
    mockfs.restore()
  })

  it('returns an array containing paths for every file in the given directory', async () => {
    mockfs({
      'test-dir': {
        'some-file1.txt': '',
        'some-file2.txt': '',
        'some-file3.txt': '',
        'some-file4.txt': '',
      }
    })
    const actual = await walk('test-dir')

    expect(actual).to.have.lengthOf(4)
  })

  it('returns a file path for a file that exists in the given directory', async () => {
    mockfs({
      'test-dir': {
        'some-file.txt': ''
      }
    })

    const expected = ['test-dir/some-file.txt']

    const actual = await walk('test-dir')

    expect(actual).to.deep.equal(expected)
  })

  it('returns empty if given directory is empty', async () => {
    mockfs({
      'test-dir': {}
    })

    const actual = await walk('test-dir')

    expect(actual).to.have.lengthOf(0)
  })

  it('returns empty if given directory only contains empty directories', async () => {
    mockfs({
      'test-dir': {
        'empty-dir-1': {},
        'empty-dir-2': {}
      }
    })

    const actual = await walk('test-dir')

    expect(actual).to.have.lengthOf(0)
  })

  it('does not include directories in the file list', async () => {
    mockfs({
      'test-dir': {
        'some-file.txt': '',
        'some-dir': {}
      }
    })

    const actual = await walk('test-dir')

    expect(actual).to.have.lengthOf(1)
  })

  it('returns all file paths for all files that exist in the given directory', async () => {
    mockfs({
      'test-dir': {
        'some-file.txt': '',
        'some-other-file.wav': '',
        'some-cool-file.mov': ''
      }
    })

    const expected = ['test-dir/some-cool-file.mov', 'test-dir/some-file.txt', 'test-dir/some-other-file.wav']

    const actual = await walk('test-dir')

    expect(actual).to.deep.equal(expected)
  })

  it('returns a file path for a file that exists in a subdirectory', async () => {
    mockfs({
      'test-dir': {
        'some-subdir': {
          'some-file.txt':  ''
        }
      }
    })

    const expected = ['test-dir/some-subdir/some-file.txt']

    const actual = await walk('test-dir')

    expect(actual).to.deep.equal(expected)
  })

  it('returns file paths for files at arbitrary depth', async () => {
    mockfs({
      'test-dir': {
        'a-file.txt': '',
        'a-empty-dir': {},
        'some-subdir': {
          'some-file.txt':  '',
          'sub-subdir': {
            'another-file.txt': '',
            'empty-dir': {}
          }
        }
      }
    })

    const expected = ['test-dir/a-file.txt', 'test-dir/some-subdir/some-file.txt', 'test-dir/some-subdir/sub-subdir/another-file.txt']

    const actual = await walk('test-dir')

    expect(actual).to.deep.equal(expected)
  })
})
