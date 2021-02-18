import { Field, ObjectType, InputType, PickType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(
  User,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class LoginOutPut extends CoreOutPut {
  @Field((type) => String, { nullable: true })
  @IsOptional()
  token?: string;
}
