import {Service} from "typedi";
import {ComponentRepository} from "../repositories/ComponentRepository";
import {OrmRepository} from "typeorm-typedi-extensions";
import {Component} from "../models/Component";
import {DishRepository} from '../repositories/DishRepository';
import {ProductRepository} from '../repositories/ProductRepository';

@Service()
export class ComponentService {

  constructor(@OrmRepository() private componentRepository: ComponentRepository,
              @OrmRepository() private dishRepository: DishRepository,
              @OrmRepository() private productRepository: ProductRepository) {
  }

  public add(dishId: number, productId: number, component: Component): Promise<Component> {
    return this.dishRepository.findOne(dishId).then(dish => {
      return this.productRepository.findOne(productId).then(product => {
        component.dish = dish;
        component.product = product;
        return this.componentRepository.save(component)
          .then(saved => {
            return saved;
          })
      })
    })
    .catch(error => {
      throw new Error(`Can't save component. Error=[${error.message}]`);
    });
  }

  public update(component: Component): Promise<Component> {
    return this.componentRepository.update(component.id, component)
      .then(() => {
        return this.componentRepository.findOne(component.id)
          .then(updated => {
            return updated;
          })
      })
      .catch(error => {
        throw new Error(`Can't update component with id=[${component.id}]. Error=[${error.message}]`);
      });
  }

  public getOne(id: number): Promise<Component> {
    return this.componentRepository.findOne(id)
      .then(found => {
        return found;
      })
      .catch(error => {
        throw new Error(`Can't find component with id=[${id}]. Error=[${error.message}]`);
      });
  }

  public remove(id: number): Promise<Component> {
    return this.componentRepository.findOne(id)
      .then(found => {
        return this.componentRepository.remove(found)
          .then(() => {
            return found;
          })
      })
      .catch(error => {
        throw new Error(`Can't remove component with id=[${id}]. Error=[${error.message}]`);
      });
  }

  public get(dishId: number): Promise<Component[]> {
    return this.componentRepository.findAllByDishId(dishId)
      .then(found => {
        return found || [];
      })
      .catch(error => {
        throw new Error(`Can't get all components. Error=[${error.message}]`);
      });
  }
}
