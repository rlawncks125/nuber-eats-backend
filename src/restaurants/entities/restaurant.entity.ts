import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  Min,
  max,
  Max,
  Length,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // GraphQL
@Entity() // DB
export class Restaurant {
  @Field((type) => Number) // GraphQL
  @PrimaryGeneratedColumn() // DB
  @IsNumber()
  id: number;

  @Field((type) => String) // GraphQL
  @Column() // DB
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Boolean, { nullable: true, defaultValue: true })
  @Column({ default: true })
  @IsBoolean()
  isVegan?: boolean;

  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  address: string;

  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  ownerName: string;

  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  categoryName: string;
}
