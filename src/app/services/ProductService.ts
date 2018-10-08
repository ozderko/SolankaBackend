import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions'
import {ProductRepository} from '../repositories/ProductRepository';
import {Product} from '../models/Product';

@Service()
export class ProductService {

  constructor(@OrmRepository() private productRepository: ProductRepository) {
  }

  public add(product: Product): Promise<Product> {
    return this.productRepository.save(product)
      .then(saved => {
        return saved;
      })
      .catch(error => {
        throw new Error(`Can't save product. Error=[${error.message}]`);
      });
  }

  public update(product: Product): Promise<Product> {
    return this.productRepository.update(product.id, product)
      .then(() => {
        return this.productRepository.findOne(product.id)
          .then(updated => {
            return updated;
          })
      })
      .catch(error => {
        throw new Error(`Can't update product with id=[${product.id}]. Error=[${error.message}]`);
      });
  }

  public getOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id)
      .then(found => {
        return found;
      })
      .catch(error => {
        throw new Error(`Can't find product with id=[${id}]. Error=[${error.message}]`);
      });
  }

  public remove(id: number): Promise<Product> {
    return this.productRepository.findOne(id)
      .then(found => {
        return this.productRepository.remove(found)
          .then(() => {
            return found;
          })
      })
      .catch(error => {
        throw new Error(`Can't remove product with id=[${id}]. Error=[${error.message}]`);
      });
  }

  public get(): Promise<Product[]> {
    return this.productRepository.find()
      .then(found => {
        return found || [];
      })
      .catch(error => {
        throw new Error(`Can't get all products. Error=[${error.message}]`);
      });
  }

  public getByDishId(dishId: number): Promise<Product[]> {
    return this.productRepository.findByDishId(dishId)
      .then(found => {
        return found || [];
      })
      .catch(error => {
        throw new Error(`Can't get products by dishId=[${dishId}]. Error=[${error.message}]`);
      });
  }

}