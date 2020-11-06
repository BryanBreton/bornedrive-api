import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorProvider, IrisDAO, LoggerProvider } from "@u-iris/iris-back";
import { Repository } from "typeorm";
import { PreparateurBE } from "~/objects/business/be/PreparateurBE";

@Injectable()
export class PreparateurDAO extends IrisDAO<PreparateurBE, {id?: number, nom?: string}> {
    
    constructor(@InjectRepository(PreparateurBE) magasinRepository: Repository<PreparateurBE>, errorProvider: ErrorProvider, loggerProvider: LoggerProvider){
        super(magasinRepository, errorProvider, loggerProvider)
    }

    public async findByName(name: string): Promise<PreparateurBE[]>{
        console.log(this.find());
        return this.find({nom: name})
    }
}