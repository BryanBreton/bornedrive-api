import { Injectable } from "@nestjs/common";
import { PreparateurDAO } from "../data/PreparateurDAO";
import { PreparateurBE } from "~/objects/business/be/PreparateurBE";

@Injectable()
export class PreparateurLBS {
    constructor(private readonly preparateurDAO: PreparateurDAO){

    }

    public async findById(id: number): Promise<PreparateurBE>{
        console.log(id);
        const prepa = await this.preparateurDAO.findById(id)
        return prepa ? prepa : new PreparateurBE()
    }
}