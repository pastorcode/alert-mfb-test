import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtGuard } from 'src/utils/guard/jwt.guard';
import { JwtStrategy } from 'src/utils/jwt/jwt-strategy';
import { RoleService } from '../role/role.service';
import { RoleRepository } from '../role/role.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    PrismaService,
    JwtStrategy,
    JwtGuard,
    RoleService,
    RoleRepository,
  ],
})
export class AuthModule {}
