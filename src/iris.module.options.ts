import { AuthenticationManager, AuthorizationManager, IrisSecurityModule } from '@u-iris/iris-back-private'
import { IrisConfigOptions } from '@u-iris/iris-back'
import path from 'path'

// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json')

export const irisModuleOptions: IrisConfigOptions = {
  logger: {
    appName: pkg.name,
    appVersion: pkg.version,
    // @ts-ignore
    level: process.env.LOG_LEVEL || 'error',
    enableConsole: true
  },
  messagesSources: path.resolve(__dirname, '../resources/i18n.properties'),
  authenticationProvider: AuthenticationManager,
  authorizationProvider: AuthorizationManager,
  imports: [
    IrisSecurityModule
  ]
}
