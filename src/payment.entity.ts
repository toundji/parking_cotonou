/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  montant: number;

  @Column()
  phone: string;

  @Column()
  code: string;

  @Column()
  date_debut: Date;

  @Column()
  date_fin: Date;

  @Column()
  transation_id:string;

  @Column({nullable:true})
  transaction_url:string;

  @Column({nullable:true, default:"AEROPORT DE COTONOU"})
  parking:string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

}
