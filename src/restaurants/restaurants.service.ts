import { ModifiyRestaurantDto } from './dtos/modifiy-restaurant.dto';
import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    //DB 연결
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  // 내가 직접 해본거

  createRestaurant(createData: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createData);
    return this.restaurants.save(newRestaurant);
    // return this.restaurants
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Restaurant)
    //   .values({
    //     ...data,
    //   })
    //   .execute();
  }
  seachRestaurant(data: string): Promise<Restaurant> {
    return this.restaurants.findOne({ name: data });
  }
  async UpdateRestaurant(data: ModifiyRestaurantDto): Promise<UpdateResult> {
    return await this.restaurants.update({ name: data.name }, { ...data });
    // return this.restaurants
    //   .createQueryBuilder()
    //   .update(Restaurant)
    //   .set({ ...data })
    //   .where('name = :name', { name: data.name })
    //   .execute();
  }
}
