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
    public async findByNumeroCarte(@PathParam('numeroCarte') numeroCarte: number, @PathParam('idBorne') idBorne : number): Promise<object> {
        console.log("oui");
        
        let retour
        if(numeroCarte.toString().length === 9) { // on a une carte U 
            const commandes = await this.commandeLBS.findByCardNumber(numeroCarte, idBorne) // recupere la ou les commandes associées
            if(!commandes) { // pas de commande trouvée
                retour = "Pas de commande, veuillez réessayer"
            } else { // on a au moins une commande
                if(commandes.statut === "En cours"){ // si la commande n'est pas finie
                    retour = "Veuillez patientez votre commande n'est pas prête"
                } else { // si elle est prete
                    if(commandes.preparateur){ // si elle est prise en charge par un preparateur
                        retour = "Votre commande d'un montant de " + commandes.montant +" euros est prete, " + commandes.preparateur.prenom + " va vous servir"
                    } else { // si elle n'est pas prise en charge
                        retour = "Votre commande d'un montant de " + commandes.montant +" euros est prete, patientez le temps que l'on vous serve"
                    }
                    
                }
            }
        } else { // numero commande
            const commande = await this.commandeLBS.findById(numeroCarte, idBorne)
            if(commande.statut) { // commande existe
                console.log(commande.statut);
                
                if(commande.statut === "En cours"){ // si la commande n'est pas finie
                    retour = "Veuillez patientez votre commande n'est pas prête"
                } else { // si elle est prete
                    if(commande.preparateur) {
                        retour = "Votre commande d'un montant de " + commande.montant +" euros est prete, " + commande.preparateur.prenom + " va vous servir"
                    } else {
                        retour = "Votre commande d'un montant de " + commande.montant +" euros est prete, patientez le temps que l'on vous serve"
                    }
                }
            } else { // commande existe pas
                retour = "Pas de commande, veuillez réessayer"
            }
        }
        return {message: retour}
    }

    
}