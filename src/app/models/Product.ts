import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Component} from "./Component";

@Entity({name: 'product'})
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'product_id'})
  id: number;

  @Column({name: 'name', type: 'varchar', nullable: false, unique: true})
  name: string;

  @Column({name: 'is_essential', type: "tinyint", nullable: true, 'default': false, unique: false})
  isEssential: boolean;

  @OneToMany(type => Component, component => component.product)
  components: Component[];
}
