import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Component} from "./Component";

@Entity({name: 'dish'})
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'dish_id'})
  id: number;

  @Column({name: 'name', type: 'varchar', nullable: false, unique: true})
  name: string;

  @Column({name: 'recipe', type: 'varchar', nullable: false, unique: false})
  recipe: string;

  @Column({name: 'description', type: 'varchar', nullable: true, unique: false})
  description: string;

  @OneToMany(type => Component, component => component.dish)
  components: Component[];
}
