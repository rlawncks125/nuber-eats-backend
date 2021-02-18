import { Restaurant } from './../entities/restaurant.entity';
import { IsBoolean, IsString, IsEmpty, IsOptional } from 'class-validator';
import { ArgsType, Field, OmitType } from '@nestjs/graphql';

@ArgsType()
export class ModifiyRestaurantDto {
  @Field((type) => String)
  @IsString()
  name: string;

  @Field((tpye) => Boolean, { nullable: true })
  @IsOptional() // 변수? 로 이해하면 될거같음
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  address: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  ownerName: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  categoryName: string;
}
