import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutPut,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutPut } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutPut } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutPut } from './dtos/user-profile.dto';
import { VerifyEmailOutPut, VerifyEmailInput } from './dtos/verify-email.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => Boolean)
  hllow(): boolean {
    return true;
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Query((returns) => UserProfileOutPut)
  @UseGuards(AuthGuard)
  async userProfile(@Args() userProfileInput: UserProfileInput) {
    return this.usersService.findById(userProfileInput.userId);
  }

  @Mutation((retruns) => CreateAccountOutPut)
  async crateAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutPut> {
    return this.usersService.CreateAccount(createAccountInput);
  }

  @Mutation((retruns) => LoginOutPut)
  async Login(@Args('input') loginInput: LoginInput): Promise<LoginOutPut> {
    return this.usersService.Login(loginInput);
  }

  @Mutation((retruns) => EditProfileOutPut)
  @UseGuards(AuthGuard)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutPut> {
    return this.usersService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation((retruns) => VerifyEmailOutPut)
  async verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutPut> {
    return this.usersService.verifyEmail(code);
  }
}

// {
//   "x-jwt" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTYxMjc2NDU2NH0.GX66i6H-HUEFUtr7ia_HkOPvPYccVZn8BmHKBl6sHfk"
// }
