import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { jf, Relation, RelationEntity } from "@u-iris/iris-back";
import { ClientBE } from "./ClientBE";
import { PreparateurBE } from "./PreparateurBE";
import { BorneBE } from "./BorneBE";

@Entity('Commande')
export class CommandeBE{
    @PrimaryGeneratedColumn('increment')
    public id?: number

    @Column({name: 'STATUT'})
    @jf.number().required()
    public statut: number

    @Column({name: 'MONTANT'})
    @jf.any().required()
    public montant: number

    @Column({name: 'TO_PICK'})
    @jf.boolean().required()
    public toPick: boolean

    @Column({name: 'CODECOURT'})
    @jf.string().required()
    public codeCourt: string

    @ManyToOne(type => ClientBE, client => client.commandes, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'CLIENT_ID' })
    @Relation(RelationEntity.ENTITY, () => ClientBE)
    public client?: ClientBE

    @ManyToOne(type => BorneBE, borne => borne.commandes, {
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'BORNE_ID' })
    @Relation(RelationEntity.ENTITY, () => BorneBE)
    public borne?: BorneBE

    @ManyToOne(type => PreparateurBE, preparateur => preparateur.commandes, {
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'PREPARATEUR_ID' })
    @Relation(RelationEntity.ENTITY, () => PreparateurBE)
    public preparateur?: PreparateurBE
}






