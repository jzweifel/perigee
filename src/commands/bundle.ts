import {Command, flags} from '@oclif/command'
import {ZipFile} from 'yazl'

import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

const walk = async (dir: string, filelist: string[] = []) => {
  const files = await readdir(dir)

  for (let file of files) {
    const filepath = path.join(dir, file)
    const filestat = await stat(filepath)

    if (filestat.isDirectory()) {
      filelist = await walk(filepath, filelist)
    } else {
      filelist.push(filepath)
    }
  }

  return filelist
}

export default class Bundle extends Command {
  static description = 'Create a proxy bundle'

  static flags = {
    help: flags.help({char: 'h'})
  }

  async run() {
    // make sure we're in a directory that contains an 'apiproxy'
    const fileList = await walk('apiproxy')
    const zipFile = new ZipFile()
    fileList.forEach(fp => zipFile.addFile(fp, fp))
    zipFile.outputStream.pipe(fs.createWriteStream(`${path.basename(process.cwd())}.zip`)).on('close', () => this.log('done'))
    zipFile.end()
  }
}