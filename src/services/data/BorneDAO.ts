import { Injectable } from "@nestjs/common";
import { IrisDAO, ErrorProvider, LoggerProvider } from "@u-iris/iris-back";
import { BorneBE } from "~/objects/business/be/BorneBE";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BorneDAO extends IrisDAO<BorneBE, {id?: number}> {
    constructor(@InjectRepository(BorneBE) magasinRepository: Repository<BorneBE>, errorProvider: ErrorProvider, loggerProvider: LoggerProvider){
        super(magasinRepository, errorProvider, loggerProvider)
    }
}