import { jf } from "@u-iris/iris-back";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Borne')
export class BorneBE{
    @PrimaryGeneratedColumn('increment')
    public id?: number

    @Column({name: 'HELP'})
    @jf.boolean().required().default(false)
    public help: boolean

}






