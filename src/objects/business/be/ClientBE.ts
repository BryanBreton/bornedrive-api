import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { jf, ReadOnly, Relation, RelationEntity } from "@u-iris/iris-back";
import { CommandeBE } from "./CommandeBE";

@Entity('Client')
export class ClientBE{
    @PrimaryColumn({name: 'NUMERO_CARTE', type: 'bigint'})
    public numeroCarte: number

    @Column({name: 'CIVILITE'})
    @jf.string().required()
    public civilite: string

    @Column({name: 'NOM'})
    @jf.string().required()
    public nom: string

    @Column({name: 'PRENOM'})
    @jf.string().required()
    public prenom: string

    @OneToMany(type => CommandeBE, commande => commande.client, {
        eager: false,
        cascade: true,
    })
    @Relation(RelationEntity.NONE, () => CommandeBE)
    @ReadOnly()
    public commandes?: CommandeBE[]  
}