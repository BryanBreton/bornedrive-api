import { INestApplication, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { IrisModule } from '@u-iris/iris-back'
import request from 'supertest'
import { irisConfigOptionsForTests } from '../../../commons/iris-config-options'
import { AppTestUtils } from '../../../commons/app-test-utils'

@Module({
  imports: [
    IrisModule.forRoot(irisConfigOptionsForTests)
  ],
  providers: [  ]
})
class TestAppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer
  }
}

describe('/actuator', () => {
  let app: INestApplication


  beforeAll(async () => {

    const module = await Test.createTestingModule({ imports: [TestAppModule] }).compile()
    app = AppTestUtils.constructApplicationFromModule(module)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
    AppTestUtils.cleanApplication()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return status OK', () => {
    return request(app.getHttpServer())
      .get('/actuator/health')
      .expect(200)
      .expect(response => {
        expect(response).toBeDefined()
        expect(response.body).toBeDefined()
        expect(response.body.status).toEqual('UP')
      })
  })
})
