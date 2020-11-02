import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IrisModule } from '@u-iris/iris-back'
import { getTypeOrmConfiguration } from './commons/connection.db'
import { irisModuleOptions } from './iris.module.options'
import { ClientBE } from './objects/business/be/ClientBE'
import { ClientEBS } from './services/exposition/ClientEBS'
import { CommandeEBS } from './services/exposition/CommandeEBS'
import { ClientLBS } from './services/business/ClientLBS'
import { ClientDAO } from './services/data/ClientDAO'
import { CommandeLBS } from './services/business/CommandeLBS'
import { CommandeDAO } from './services/data/CommandeDAO'
import { CommandeBE } from './objects/business/be/CommandeBE'

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfiguration()),
    TypeOrmModule.forFeature([
      ClientBE, CommandeBE
      // TODO : ajouter l'ensemble des types BE liés à la base de données
    ]),
    IrisModule.forRoot(irisModuleOptions)
  ],
  controllers: [
    ClientEBS, CommandeEBS
    // TODO : ajouter l'ensemble des types EBS d'exposition
  ],
  providers: [
    ClientLBS, ClientDAO, CommandeLBS, CommandeDAO
    // TODO : ajouter l'ensemble des types beans LBS et DAO pouvant être injectés
  ]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
  }
}
