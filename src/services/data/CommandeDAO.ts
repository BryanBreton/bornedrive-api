import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorProvider, IrisDAO, LoggerProvider } from "@u-iris/iris-back";
import { Repository } from "typeorm";
import { CommandeBE } from "~/objects/business/be/CommandeBE";

@Injectable()
export class CommandeDAO extends IrisDAO<CommandeBE, {id?: number, "client.numeroCarte"?: number}> {
    
    constructor(@InjectRepository(CommandeBE) magasinRepository: Repository<CommandeBE>, errorProvider: ErrorProvider, loggerProvider: LoggerProvider){
        super(magasinRepository, errorProvider, loggerProvider)
    }

    public async findByClientId(cardNumber: number): Promise<CommandeBE[]>{
        console.log(this.find());
        return this.find({"client.numeroCarte": cardNumber})
    }
}