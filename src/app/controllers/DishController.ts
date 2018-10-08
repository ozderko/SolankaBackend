import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {Service} from "typedi";
import {DishService} from "../services/DishService";
import {Dish} from "../models/Dish";

@JsonController('/dishes')
export class DishController {

  constructor(@Service() private dishService: DishService){
  }

  @Post()
  @OnUndefined(400)
  public add(@Body() dish: Dish): Promise<Dish> {
    return this.dishService.add(dish);
  }

  @Put()
  @OnUndefined(400)
  public update(@Body() dish: Dish): Promise<Dish> {
    return this.dishService.update(dish);
  }

  @Get()
  @OnUndefined(404)
  public get(): Promise<Dish[]> {
    return this.dishService.get();
  }

  @Get('/:id')
  @OnUndefined(404)
  public getOne(@Param('id') id: number): Promise<Dish> {
    return this.dishService.getOne(id);
  }

  @Delete('/:id')
  @OnUndefined(404)
  public remove(@Param('id') id: number): Promise<Dish> {
    return this.dishService.remove(id);
  }
}