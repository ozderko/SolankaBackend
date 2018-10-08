import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from 'routing-controllers';
import {Service} from 'typedi';
import {ComponentService} from '../services/ComponentService';
import {Component} from '../models/Component';

@JsonController('/components/:dishId')
export class ComponentController {

  constructor(@Service() private componentService: ComponentService) {
  }

  @Post('/:productId')
  @OnUndefined(400)
  public add(@Param('dishId') dishId: number,
             @Param('productId') productId: number,
             @Body() component: Component): Promise<Component> {
    return this.componentService.add(dishId, productId, component);
  }

  @Put()
  @OnUndefined(400)
  public update(@Body() dish: Component): Promise<Component> {
    return this.componentService.update(dish);
  }

  @Get()
  @OnUndefined(404)
  public get(@Param('dishId') dishId: number): Promise<Component[]> {
    return this.componentService.get(dishId);
  }

  @Get('/:id')
  @OnUndefined(404)
  public getOne(@Param('id') id: number): Promise<Component> {
    return this.componentService.getOne(id);
  }

  @Delete('/:id')
  @OnUndefined(404)
  public remove(@Param('id') id: number): Promise<Component> {
    return this.componentService.remove(id);
  }
}
