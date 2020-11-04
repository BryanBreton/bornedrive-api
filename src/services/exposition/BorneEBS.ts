import { Controller, Get } from "@nestjs/common";
import { Resource, PathParam } from "@u-iris/iris-back";
import { BorneBE } from "~/objects/business/be/BorneBE";
import { BorneLBS } from "../business/BorneLBS";

@Controller('/bornes')
export class BorneEBS{
    constructor(private readonly borneLBS: BorneLBS){

    }

    @Get('/help/:idBorne')
    @Resource(BorneBE)
    public async help(@PathParam('idBorne') idBorne: number){
        this.borneLBS.help(idBorne)
    }
}



