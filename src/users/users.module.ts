import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  // imports: [TypeOrmModule.forFeature([User]), ConfigService, JwtService], // isGlobal : true 또는 Global 옵션이면 정의 안해도됨
  imports: [TypeOrmModule.forFeature([User, Verification])],
  exports: [UsersService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
