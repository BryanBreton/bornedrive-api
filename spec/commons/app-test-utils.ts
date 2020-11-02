import { INestApplication } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { Test, TestingModule } from '@nestjs/testing'
import { cleanApplicationContext, ExceptionFilter, setApplicationContext } from '@u-iris/iris-back'
import { ErrorDO, IrisException } from '@u-iris/iris-common'
import '@u-iris/iris-common-test-utils'
import * as request from 'superagent'

interface ErrorInResponse {
  field?: ErrorDO['field']
  code?: ErrorDO['code']
  label?: ErrorDO['label']
  path?: ErrorDO['path']
  value?: ErrorDO['value']
  limit?: ErrorDO['limit']
}

export declare type ObjectType<T> = (new () => T);


export class AppTestUtils {

  public static getValidObject<T>(obj: T, type: ObjectType<T>) {
    const result = new type()
    for (const key of Object.keys(obj)) {
      result[key] = obj[key]
    }
    return result
  }

  public static async expectThrowIrisExceptionLike<T extends IrisException>(fct: (...args: any[]) => any, exceptionType: new(...args: any[]) => T, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: Array<string | number> }>) {
    let exception
    try {
      let r = fct()
      if (r instanceof Promise) {
        r = await r
      }
    } catch (e) {
      exception = e
    }

    expect(exception).toBeDefined()
    expect(exception).toBeInstanceOf(exceptionType)
    AppTestUtils.expectExceptionToContain(exception, ...errors)
  }

  public static expectExceptionToContain(exception: IrisException, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: Array<string | number> }>) {
    expect(exception).toBeDefined()
    expect(exception.errors).toBeDefined()
    if (errors) {
      for (const e of errors) {
        expect(exception.errors).toContainObjectLike(e)
      }
    }
  }

  public static expectErreurReturned(response: request.Response, ...erreurs: ErrorInResponse[]) {
    expect(response.body).toBeDefined()
    expect(response.body.errors).toBeDefined()
    expect(response.body.errors).toBeInstanceOf(Array)
    expect(response.body.errors).toHaveLength(erreurs.length)
    for (const err of erreurs) {
      expect(response.body.errors).toContainObjectLike(err)
    }
  }

  public static async bootstrapNestJS(metadata: ModuleMetadata): Promise<{ app: INestApplication, module: TestingModule }> {
    if (!metadata.providers) {
      metadata.providers = []
    }
    const module: TestingModule = await Test.createTestingModule(metadata).compile()
    const app = AppTestUtils.constructApplicationFromModule(module)
    return { app, module }
  }

  public static constructApplicationFromModule(module: TestingModule) {
    const app = module.createNestApplication()
    setApplicationContext(app)
    app.useGlobalFilters(new ExceptionFilter()) // error handler
    return app
  }

  public static cleanApplication() {
    cleanApplicationContext()
  }
}
