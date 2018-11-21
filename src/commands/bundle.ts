import {Command, flags} from '@oclif/command'
import {ZipFile} from 'yazl'

import * as fs from 'fs'
import * as path from 'path'

import {retrieveListOfFilesRecursively} from '../util'

export default class Bundle extends Command {
  static description = "Bundle a proxy directory. A proxy directory is a directory that contains an 'apiproxy' directory."

  static flags = {
    help: flags.help({char: 'h'})
  }

  async run() {
    const folderExists = fs.existsSync('apiproxy')
    if (!folderExists) this.error("Attempting to bundle something that isn't a proxy! Hint: an apiproxy subdirectory should exist here.")

    const fileList = await retrieveListOfFilesRecursively('apiproxy')
    const zipFile = new ZipFile()
    fileList.forEach(fp => zipFile.addFile(fp, fp))
    zipFile.outputStream
      .pipe(fs.createWriteStream(`${path.basename(process.cwd())}.zip`))
      .on('close', () => this.log(`Successfully created bundle ${process.cwd()}/${path.basename(process.cwd())}.zip!`))
    zipFile.end()
  }
}
