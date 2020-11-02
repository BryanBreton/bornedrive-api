import { Controller, Get } from "@nestjs/common";
import { Resource, PathParam } from "@u-iris/iris-back";
import { ClientBE } from "~/objects/business/be/ClientBE";
import { ClientLBS } from "../business/ClientLBS";

@Controller('/clients')
export class ClientEBS{
    constructor(private readonly clientLBS: ClientLBS){

    }
    @Get('/')
    @Resource(ClientBE)
    public async findAll() : Promise<ClientBE[]>{
        return this.clientLBS.findAll()
    }

    @Get('/:numeroCarte')
    @Resource(ClientBE)
    public async findByNumeroCarte(@PathParam('numeroCarte') numeroCarte: string): Promise<ClientBE> {
        console.log(numeroCarte);
        return this.clientLBS.findByCardNumber(numeroCarte)
    }
}



