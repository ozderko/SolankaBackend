import {EntityRepository, Repository} from 'typeorm';
import {Component} from "../models/Component";

@EntityRepository(Component)
export class ComponentRepository extends Repository<Component> {
  findAllByDishId(dishId: number): Promise<Component[]> {
    return this.createQueryBuilder('component')
      .select()
      .where('component.dishId = :dishId', {dishId: dishId})
      .getMany();
  }
}