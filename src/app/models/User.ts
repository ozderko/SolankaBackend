import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Component} from "./Component";


@Entity({name: 'user'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'user_id'})
    id: number;

    @Column({name: 'user', type: 'varchar', nullable: false, unique: true})
    user: string;

    @Column({name: 'password', type: 'varchar', nullable: false, unique: true})
    password: string;
}