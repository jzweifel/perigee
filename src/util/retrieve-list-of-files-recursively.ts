import * as fs from 'fs'
import {join} from 'path'
import {promisify} from 'util'

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const retrieveListOfFilesRecursively = async (dir: string, filelist: string[] = []) => {
  const files = await readdir(dir)

  for (let file of files) {
    const filepath = join(dir, file)
    const filestat = await stat(filepath)

    if (filestat.isDirectory()) {
      filelist = await retrieveListOfFilesRecursively(filepath, filelist)
    } else {
      filelist.push(filepath)
    }
  }

  return filelist
}

export default retrieveListOfFilesRecursively
