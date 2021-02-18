import { ModifiyRestaurantDto } from './dtos/modifiy-restaurant.dto';
import { InsertResult } from 'typeorm';
import { RestaurantService } from './restaurants.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantService) {}
  @Query((returns) => [Restaurant]) // graphQL 타입
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantsService.getAll();
  }

  //내가 직접해본거

  @Mutation((returns) => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    try {
      this.restaurantsService.createRestaurant(createRestaurantDto);
      return true;
    } catch {
      return false;
    }
  }
  @Mutation((retruns) => Restaurant)
  serachingName(@Args('name') name: string): Promise<Restaurant> {
    return this.restaurantsService.seachRestaurant(name);
  }
  @Mutation((returns) => Boolean)
  modifiyRestaurant(@Args() modifiyDto: ModifiyRestaurantDto) {
    try {
      this.restaurantsService.UpdateRestaurant(modifiyDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
