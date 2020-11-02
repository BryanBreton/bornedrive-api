import { Injectable } from "@nestjs/common";
import { IrisDAO, ErrorProvider, LoggerProvider } from "@u-iris/iris-back";
import { ClientBE } from "~/objects/business/be/ClientBE";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ClientDAO extends IrisDAO<ClientBE, {id?: number, numeroCarte?: string}> {
    constructor(@InjectRepository(ClientBE) magasinRepository: Repository<ClientBE>, errorProvider: ErrorProvider, loggerProvider: LoggerProvider){
        super(magasinRepository, errorProvider, loggerProvider)
    }
    public async findAll(): Promise<ClientBE[]>{
        return this.find()
    }
}