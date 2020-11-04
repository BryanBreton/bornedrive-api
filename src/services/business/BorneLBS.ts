import { Injectable } from "@nestjs/common";
import { BorneDAO } from "../data/BorneDAO";

@Injectable()
export class BorneLBS {
    constructor(private readonly borneDAO: BorneDAO){

    }
    public async help(id: number){
        const borne = await this.borneDAO.findById(id)
        if(borne){
            borne.help = true
            this.borneDAO.save(borne)
        }
    }
}