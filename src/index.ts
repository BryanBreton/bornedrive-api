import 'reflect-metadata'
import { bootstrapIrisApp, getLogger } from '@u-iris/iris-back'
import { AppModule } from './app.module'

(async () => {
  try {
    const port = parseInt(process.env.NODE_REQUESTPORT || '3000')
    await bootstrapIrisApp(AppModule, { port })
    getLogger().info(`Server running at http://127.0.0.1:${port}/`)
  } catch (e) {
    getLogger().error(e)
  }
})()
