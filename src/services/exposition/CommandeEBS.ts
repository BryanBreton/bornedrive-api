import { Controller, Get } from "@nestjs/common";
import { Resource, PathParam } from "@u-iris/iris-back";
import { CommandeBE } from "~/objects/business/be/CommandeBE";
import { CommandeLBS } from "../business/CommandeLBS";

@Controller('/commandes')
export class CommandeEBS{
    constructor(private readonly commandeLBS: CommandeLBS){

    }
    @Get('/toPick')
    @Resource(CommandeBE)
    public async findCommandesToPick() : Promise<CommandeBE[]> {

        const comm = await this.commandeLBS.findCommandesToPick()
        console.log(comm);
        
        return comm
        
    }

    @Get('/:idCommande/preparateur/:idPreparateur')
    @Resource(CommandeBE)
    public async pickCommande(@PathParam('idCommande') idCommande: number, @PathParam('idPreparateur') idPreparateur: number) {
        this.commandeLBS.pickCommande(idCommande, idPreparateur)
    }

    @Get('/:numeroCarte/borne/:idBorne')
    @Resource(CommandeBE)
    public async findByNumeroCarte(@PathParam('numeroCarte') numeroCarte: bigint, @PathParam('idBorne') idBorne : number): Promise<object> {
        console.log("oui");
        
        let retour
        console.log('taille : ' + numeroCarte.toString().length)
        if(numeroCarte.toString().length === 14) { // on a une carte U 
            const commandes = await this.commandeLBS.findByCardNumber(numeroCarte, idBorne) // recupere la ou les commandes associées
            if(!commandes) { // pas de commande trouvée
                retour = {hasCommande: false}
            } else { // on a au moins une commande
                if(commandes.statut === 1){ // si la commande n'est pas finie
                    console.log("iciiiiii");
                    
                    retour = {hasCommande: true, statut: "En Cours", client: commandes.client}
                } else { // si elle est prete
                    if(commandes.preparateur){ // si elle est prise en charge par un preparateur
                        retour = {hasCommande: true, statut: "Prete", montant: commandes.montant, preparateur: commandes.preparateur, client: commandes.client} 
                    } else { // si elle n'est pas prise en charge
                        console.log("laaaa");
                        
                        retour = {hasCommande: true, statut: "En Attente", montant: commandes.montant, client: commandes.client}
                    }
                    
                }
            }
        } else { // numero commande
            const commande = await this.commandeLBS.findById(numeroCarte, idBorne)
            if(commande.statut) { // commande existe
                console.log(commande.statut);
                
                if(commande.statut === 1){ // si la commande n'est pas finie
                    retour = {hasCommande: true, statut: "En Cours", client: commande.client}

                } else { // si elle est prete
                    if(commande.preparateur) {
                        retour = {hasCommande: true, statut: "Prete", montant: commande.montant, preparateur: commande.preparateur, client: commande.client} 
                    } else {
                        retour = {hasCommande: true, statut: "En Attente", montant: commande.montant, client: commande.client}
                    }
                }
            } else { // commande existe pas
                retour = {hasCommande: false}
            }
        }
        return retour
    }

    
}