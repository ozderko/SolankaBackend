import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {Service} from "typedi";
import {ProductService} from "../services/ProductService";
import {Product} from "../models/Product";

@JsonController('/products')
export class ProductController {
  constructor(@Service() private productService: ProductService){
  }

  @Post()
  @OnUndefined(400)
  public add(@Body() product: Product): Promise<Product> {
    return this.productService.add(product);
  }

  @Put()
  @OnUndefined(400)
  public update(@Body() product: Product): Promise<Product> {
    return this.productService.update(product);
  }

  @Get('/:id')
  @OnUndefined(404)
  public getOne(@Param('id') id: number): Promise<Product> {
    return this.productService.getOne(id);
  }

  @Delete('/:id')
  @OnUndefined(404)
  public remove(@Param('id') id: number): Promise<Product> {
    return this.productService.remove(id);
  }

  @Get()
  @OnUndefined(404)
  public get(): Promise<Product[]> {
    return this.productService.get();
  }

  @Get('/bydishid/:dishId')
  @OnUndefined(404)
  public getByDishId(@Param('dishId') dishId: number): Promise<Product[]> {
    return this.productService.getByDishId(dishId);
  }
}