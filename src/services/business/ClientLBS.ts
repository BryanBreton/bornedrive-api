import { Injectable } from "@nestjs/common";
import { ClientDAO } from "../data/ClientDAO";
import { ClientBE } from "~/objects/business/be/ClientBE";

@Injectable()
export class ClientLBS {
    constructor(private readonly clientDAO: ClientDAO){

    }
    public async findAll() : Promise<ClientBE[]>{
        return this.clientDAO.findAll()
    }

    public async findByCardNumber(cardNumber: string): Promise<ClientBE>{
        console.log(cardNumber);
        const clients = await this.clientDAO.findOne({numeroCarte: cardNumber})
        return clients ? clients : new ClientBE()
    }
}