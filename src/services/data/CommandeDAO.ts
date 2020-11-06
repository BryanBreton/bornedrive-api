import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorProvider, IrisDAO, LoggerProvider } from "@u-iris/iris-back";
import { Repository } from "typeorm";
import { BorneBE } from "~/objects/business/be/BorneBE";
import { CommandeBE } from "~/objects/business/be/CommandeBE";

@Injectable()
export class CommandeDAO extends IrisDAO<CommandeBE, {id?: number, "client.numeroCarte"?: number}> {
    
    constructor(@InjectRepository(CommandeBE) magasinRepository: Repository<CommandeBE>, errorProvider: ErrorProvider, loggerProvider: LoggerProvider){
        super(magasinRepository, errorProvider, loggerProvider)
    }

    public async findByClientId(cardNumber: number, borne: BorneBE): Promise<CommandeBE>{
        console.log(this.find());
        const commande = await this.findOne({"client.numeroCarte": cardNumber})
        if(commande) {
            if(commande.statut === "Commandee") {
                commande.borne = borne
                commande.statut = "En cours"
                commande.toPick = true
                this.save(commande)              
            } else {
                // rafraichis
            }
            
        }
        return commande ? commande : new CommandeBE()
    }

    public async findCommandesToPick(): Promise<CommandeBE[]> {
        const commandes = await this.find()
        let comm = commandes.filter(c => c.toPick === true)
        comm = comm.filter(c => c.borne)
        comm.map(cmd => delete cmd.preparateur)
        return comm
    }
}