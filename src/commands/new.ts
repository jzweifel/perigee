import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import {template} from 'lodash'

import * as fs from 'fs'
import * as util from 'util'

const mkdir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

export default class New extends Command {
  static description = 'Generate a new proxy'

  static flags = {
    help: flags.help({char: 'h'})
  }

  async run() {
    const answers: any = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiName',
        message: 'Name of the api?',
        default: 'my-api'
      },
      {
        type: 'input',
        name: 'basePath',
        message: 'Base path for the proxy?',
        default: '/v1/my-api'
      },
      {
        type: 'input',
        name: 'targetPath',
        message: 'Target URL?',
        default: 'https://mocktarget.apigee.net/echo'
      }
    ])

    const {apiName, basePath, targetPath} = answers

    const [
      apiProxyTemplate,
      proxyEndpointTemplate,
      raiseFaultNotFoundTemplate,
      targetEndpointTemplate
    ] = await Promise.all([
      readFile(`${__dirname}/../templates/ApiProxy.xml`),
      readFile(`${__dirname}/../templates/ProxyEndpoint.xml`),
      readFile(`${__dirname}/../templates/RaiseFaultNotFound.xml`),
      readFile(`${__dirname}/../templates/TargetEndpoint.xml`)
    ]).then(r => r.map(s => template(s.toString())))

    const apiProxy = apiProxyTemplate({apiName, basePath})
    const proxyEndpoint = proxyEndpointTemplate({basePath})
    const targetEndpoint = targetEndpointTemplate({targetPath})

    await mkdir(apiName)
    await mkdir(`${apiName}/apiproxy`)
    await Promise.all([
      mkdir(`${apiName}/apiproxy/policies`),
      mkdir(`${apiName}/apiproxy/proxies`),
      mkdir(`${apiName}/apiproxy/targets`)
    ])

    await Promise.all([
      writeFile(`${apiName}/apiproxy/${apiName}.xml`, apiProxy),
      writeFile(
        `${apiName}/apiproxy/policies/RaiseFaultNotFound.xml`,
        raiseFaultNotFoundTemplate()
      ),
      writeFile(`${apiName}/apiproxy/proxies/default.xml`, proxyEndpoint),
      writeFile(`${apiName}/apiproxy/targets/default.xml`, targetEndpoint)
    ])

    this.log(`${__dirname}/${apiName} successfully created!`)
  }
}
