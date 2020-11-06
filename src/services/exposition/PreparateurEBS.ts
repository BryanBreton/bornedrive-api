import { Controller, Get } from "@nestjs/common";
import { Resource, PathParam } from "@u-iris/iris-back";
import { PreparateurBE } from "~/objects/business/be/PreparateurBE";
import { PreparateurLBS } from "../business/PreparateurLBS";

@Controller('/preparateurs')
export class PreparateurEBS{
    constructor(private readonly preparateurLBS: PreparateurLBS){

    }
    @Get('/:id')
    @Resource(PreparateurBE)
    public async findCommandesToPick(@PathParam('id') id: number) : Promise<PreparateurBE> {

        const prepa = await this.preparateurLBS.findById(id)
        console.log(prepa);
        return prepa
        
    }

    
}