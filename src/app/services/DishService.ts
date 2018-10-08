import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions'
import {DishRepository} from '../repositories/DishRepository';
import {Dish} from '../models/Dish';

@Service()
export class DishService {
  constructor(@OrmRepository() private dishRepository: DishRepository) {
  }

  public add(dish: Dish): Promise<Dish> {
    return this.dishRepository.save(dish)
      .then(saved => {
        return saved;
      })
      .catch(error => {
        throw new Error(`Can't save dish. Error=[${error.message}]`);
      });
  }

  public getOne(id: number): Promise<Dish> {
    return this.dishRepository.findOne(id)
      .then(found => {
        return found;
      })
      .catch(error => {
        throw new Error(`Can't find dish with id=[${id}]. Error=[${error.message}]`);
      });
  }

  public get(): Promise<Dish[]> {
    return this.dishRepository.find()
      .then(found => {
        return found || [];
      })
      .catch(error => {
        throw new Error(`Can't find all dishes. Error=[${error.message}]`);
      });
  }

  public remove(id: number): Promise<Dish> {
    return this.dishRepository.findOne(id)
      .then(found => {
        return this.dishRepository.remove(found)
          .then(() => {
            return found;
          });
      })
      .catch(error => {
        throw new Error(`Can't remove dish with id=[${id}]. Error=[${error.message}]`);
      });
  }

  public update(dish: Dish): Promise<Dish> {
    return this.dishRepository.update(dish.id, dish)
      .then(() => {
        return this.dishRepository.findOne(dish.id)
          .then(updated => {
            return updated;
          })
      }).catch(error => {
        throw new Error(`Can't update dish with id=[${dish.id}]. Error=[${error.message}]`);
      });
  }
}