import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findById(id: number) {
    return this.roleRepository.findById(id);
  }

  async createUserRole(data: Prisma.UserRoleCreateInput) {
    return this.roleRepository.createUserRole(data);
  }
}
