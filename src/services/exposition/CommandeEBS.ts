import { Controller, Get } from "@nestjs/common";
import { Resource, PathParam } from "@u-iris/iris-back";
import { CommandeBE } from "~/objects/business/be/CommandeBE";
import { CommandeLBS } from "../business/CommandeLBS";

@Controller('/commandes')
export class CommandeEBS{
    constructor(private readonly commandeLBS: CommandeLBS){

    }
    @Get('/:numeroCarte')
    @Resource(CommandeBE)
    public async findByNumeroCarte(@PathParam('numeroCarte') numeroCarte: number): Promise<object> {
        let retour
        if(numeroCarte.toString().length === 9) { // on a une carte U 
            const commandes = await this.commandeLBS.findByCardNumber(numeroCarte) // recupere la ou les commandes associées
            if(commandes.length === 0) { // pas de commande trouvée
                retour = "Pas de commande, veuillez réessayer"
            } else { // on a au moins une commande
                if(commandes[0].statut === "En cours"){ // si la commande n'est pas finie
                    retour = "Veuillez patientez votre commande n'est pas prête"
                } else { // si elle est prete
                    retour = "Votre commande est prete, nous allons vous servir"
                }
            }
        } else { // numero commande
            const commande = await this.commandeLBS.findById(numeroCarte)
            if(commande.statut) { // commande existe
                console.log(commande.statut);
                
                if(commande.statut === "En cours"){ // si la commande n'est pas finie
                    retour = "Veuillez patientez votre commande n'est pas prête"
                } else { // si elle est prete
                    retour = "Votre commande est prete, nous allons vous servir"
                }
            } else { // commande existe pas
                retour = "Pas de commande, veuillez réessayer"
            }
        }
        return {message: retour}
    }
}