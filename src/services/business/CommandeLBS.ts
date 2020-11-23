import { Injectable } from "@nestjs/common";
import { CommandeDAO } from "../data/CommandeDAO";
import { CommandeBE } from "~/objects/business/be/CommandeBE";
import { PreparateurDAO } from "../data/PreparateurDAO";
import { BorneDAO } from "../data/BorneDAO";
import { BorneBE } from "~/objects/business/be/BorneBE";

@Injectable()
export class CommandeLBS {
    constructor(private readonly commandeDAO: CommandeDAO, private readonly preparateurDAO: PreparateurDAO, private readonly borneDAO: BorneDAO){

    }

    public async findByCardNumber(cardNumber: bigint, idBorne: number): Promise<CommandeBE>{
        console.log(cardNumber + " " + idBorne);
        let borne = await this.borneDAO.findById(idBorne)
        !borne ? borne = new BorneBE() : borne = borne
        const commandes = await this.commandeDAO.findByClientId(cardNumber, borne)
        return commandes
    }

    public async findById(id: bigint, idBorne: number): Promise<CommandeBE>{
        console.log(id);
        const commande = await this.commandeDAO.findById(Number(id))
        if(commande) {
            if(commande.statut === 1) {
                commande.borne = await this.borneDAO.findById(idBorne)
                commande.toPick = true
                commande.statut = 2
                this.commandeDAO.save(commande)  
                // premiere
            } else {
                // rafraichis
            }
        }
        return commande ? commande : new CommandeBE()
    }

    public async pickCommande(id: number, idPreparateur: number) {
        const commande = await this.commandeDAO.findById(id)
        if(commande) {
            const preparateur = await this.preparateurDAO.findById(idPreparateur)
            if(preparateur) {
                commande.preparateur = preparateur
                // commande.toPick = false
                commande.statut = 3
                this.commandeDAO.save(commande)
            }
        }
        
    }

    public async findCommandesToPick(): Promise<CommandeBE[]> {
        const comm = await this.commandeDAO.findCommandesToPick()
        console.log(comm);
        return comm
        
    }
}