import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Dish} from "./Dish";
import {Product} from "./Product";

@Entity({name: 'component'})
export class Component extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'component_id'})
  id: number;

  @Column({name: 'dish', type: 'bigint', nullable: true, unique: false})
  weight: number;

  @ManyToOne(type => Dish, dish => dish.components)
  dish: Dish;

  @ManyToOne(type => Product, product => product.components)
  product: Product;
}