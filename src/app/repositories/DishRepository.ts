import {EntityRepository, Repository} from "typeorm";
import {Dish} from "../models/Dish";

@EntityRepository(Dish)
export class DishRepository extends Repository<Dish> {

}