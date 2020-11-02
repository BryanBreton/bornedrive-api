import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { jf, Relation, RelationEntity } from "@u-iris/iris-back";
import { ClientBE } from "./ClientBE";

@Entity('Commande')
export class CommandeBE{
    @PrimaryGeneratedColumn('increment')
    public id?: number

    @Column({name: 'STATUT'})
    @jf.string().required()
    public statut: string

    @ManyToOne(type => ClientBE, client => client.commandes, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'CLIENT_ID' })
    @Relation(RelationEntity.ASSOCIATION, () => ClientBE)
    public client?: ClientBE
}






