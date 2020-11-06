import { jf, ReadOnly, Relation, RelationEntity } from "@u-iris/iris-back";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommandeBE } from "./CommandeBE";

@Entity('Borne')
export class BorneBE{
    @PrimaryGeneratedColumn('increment')
    public id?: number

    @Column({name: 'HELP'})
    @jf.boolean().required().default(false)
    public help: boolean

    @Column({name: 'COLOR'})
    @jf.string().required()
    public color: string

    @OneToMany(type => CommandeBE, commande => commande.borne, {
        eager: false,
        cascade: true,
    })
    @Relation(RelationEntity.NONE, () => CommandeBE)
    @ReadOnly()
    public commandes?: CommandeBE[]  

}






