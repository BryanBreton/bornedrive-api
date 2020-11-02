import { IrisConfigOptions } from '@u-iris/iris-back'
import path from 'path'

// tslint:disable-next-line:no-var-requires
const pkg = require('../../package.json')

export const irisConfigOptionsForTests: IrisConfigOptions = {
  logger: {
    appName: pkg.name,
    appVersion: pkg.version,
    level: 'debug',
    enableConsole: true
  },
  messagesSources: path.resolve(__dirname, '../../resources/i18n.properties'),
  actuatorOptions: {
    enableTypeOrm: false
  }
}
