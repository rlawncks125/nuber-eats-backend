import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { number } from 'joi';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutPut extends CoreOutPut {
  @Field((type) => User, { nullable: true })
  user?: User;
}
