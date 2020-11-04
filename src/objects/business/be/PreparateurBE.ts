import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { jf, ReadOnly, Relation, RelationEntity } from "@u-iris/iris-back";
import { CommandeBE } from "./CommandeBE";

@Entity('Preparateur')
export class PreparateurBE{
    @PrimaryGeneratedColumn('increment')
    public id?: number

    @Column({name: 'NOM'})
    @jf.string().required()
    public nom: string

    @Column({name: 'PRENOM'})
    @jf.string().required()
    public prenom: string

    @OneToMany(type => CommandeBE, commande => commande.preparateur, {
        eager: false,
        cascade: true,
    })
    @Relation(RelationEntity.NONE, () => CommandeBE)
    @ReadOnly()
    public commandes?: CommandeBE[]  
}