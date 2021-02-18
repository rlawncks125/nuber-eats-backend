import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { extendSchema } from 'graphql';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(
  User,
  ['email', 'password', 'role'],
  InputType,
) {}

@ObjectType()
export class CreateAccountOutPut extends CoreOutPut {}
