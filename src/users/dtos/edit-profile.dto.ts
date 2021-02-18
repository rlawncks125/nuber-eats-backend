import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { object } from 'joi';
import { CoreOutPut } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password'], InputType),
  InputType,
) {}

@ObjectType()
export class EditProfileOutPut extends CoreOutPut {}
