import { Injectable } from "@nestjs/common";
import { CommandeDAO } from "../data/CommandeDAO";
import { CommandeBE } from "~/objects/business/be/CommandeBE";

@Injectable()
export class CommandeLBS {
    constructor(private readonly commandeDAO: CommandeDAO){

    }

    public async findByCardNumber(cardNumber: number): Promise<CommandeBE[]>{
        console.log(cardNumber);
        const commandes = await this.commandeDAO.findByClientId(cardNumber)
        return commandes
    }
    public async findById(id: number): Promise<CommandeBE>{
        console.log(id);
        const commandes = await this.commandeDAO.findById(id)
        return commandes ? commandes : new CommandeBE()
    }
}