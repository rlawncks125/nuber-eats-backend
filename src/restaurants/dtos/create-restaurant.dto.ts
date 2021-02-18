import { Restaurant } from './../entities/restaurant.entity';
import { ArgsType, Field, OmitType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

// OmitType (객체 , 제외할 변수 , 반환할 데코레이터 타입)
// 객체에서 제외할 변수를 빼고 같은 변수의 설정도 같이 정의할수 있음
@ArgsType()
export class CreateRestaurantDto extends OmitType(
  Restaurant,
  ['id'],
  ArgsType,
) {
  // @Field((type) => String)
  // @IsString()
  // @Length(5, 10)
  // name: string;
  // @Field((type) => Boolean)
  // @IsBoolean()
  // isVegan: boolean;
  // @Field((type) => String)
  // @IsString()
  // address: string;
  // @Field((type) => String)
  // @IsString()
  // @Length(5, 10)
  // ownerName: string;
  // @Field((type) => String)
  // @IsString()
  // categoryName: string;
}
