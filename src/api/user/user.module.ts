import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from '../role/role.service';
import { RoleRepository } from '../role/role.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PrismaService,
    RoleService,
    RoleRepository,
  ],
})
export class UserModule {}
