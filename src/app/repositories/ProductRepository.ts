import {EntityRepository, Repository} from "typeorm";
import {Product} from "../models/Product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findByDishId(dishId: number): Promise<Product[]> {
    return this.createQueryBuilder('product')
      .leftJoin('product.components', 'components')
      .select()
      .where('components.dishId = :dishId', {dishId: dishId})
      .getMany();
  }
}