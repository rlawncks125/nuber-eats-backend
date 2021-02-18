import { VerifyEmailOutPut } from './dtos/verify-email.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import {
  CreateAccountInput,
  CreateAccountOutPut,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutPut } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutPut } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { UserProfileOutPut } from './dtos/user-profile.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async CreateAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutPut> {
    const { email } = createAccountInput;
    try {
      const exists = await this.users.findOne({ email }); // 유저확인 & 새로운 유저라면 Create
      if (exists) {
        return { ok: false, error: '이미 같은 이메일로 가입한 유저가 있다' };
      }
      // 유저 생성
      const user = await this.users.save(this.users.create(createAccountInput));
      // console.log(user);
      // 이메일 검증
      const verification = await this.verification.save(
        this.verification.create({
          user,
        }),
      );
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true };
    } catch (e) {
      //error
      return { ok: false, error: 'Couldn`t create account' };
    }
  }

  async Login({ email, password }: LoginInput): Promise<LoginOutPut> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      // 아이디 있는지 확인
      if (!user) {
        return { ok: false, error: '유저를 찾지 못했습니다.' };
      }
      // 패스워드 확인
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: '패스워드가 틀립니다.' };
      }
      // 성공
      // 토큰 생성
      // const token = jwt.sign({ id: user.id }, this.config.get('PRIVATE_KEY'));
      const token = this.jwtService.sign({ id: user.id });
      return { ok: true, token };
    } catch (err) {
      return { ok: false };
    }
  }

  async findById(id: number): Promise<UserProfileOutPut> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return {
        ok: false,
        error: '유저를 찾을수 없습니다.',
      };
    }
  }

  async editProfile(
    userId: number,
    editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutPut> {
    try {
      const { email, password } = editProfileInput;
      const user = await this.users.findOne(userId);
      // console.log(user);
      if (editProfileInput?.password) user.password = password;

      if (email) {
        user.email = email;
        user.verified = false;
        this.verification.delete({ user });
        const verification = await this.verification.save(
          this.verification.create({ user }),
        );
        this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      // console.log({ ...user });
      password && this.users.save(user);
      !password && this.users.update(userId, { ...user });

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutPut> {
    try {
      const verification = await this.verification.findOne(
        { code },
        { loadRelationIds: true },
      );
      if (verification) {
        await this.users.update(verification.user, { verified: true });
        await this.verification.delete(verification.id);
        return { ok: true };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }
}
