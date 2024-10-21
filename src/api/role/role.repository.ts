import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({
      data,
    });
  }

  async createUserRole(data: Prisma.UserRoleCreateInput) {
    return this.prisma.userRole.create({
      data,
    });
  }
}
