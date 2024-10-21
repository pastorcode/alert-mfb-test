import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import { AssignRoleDto } from './dto/assign-role.dto';

describe('UserService - Assign Role', () => {
  let userService: UserService;
  let roleService: RoleService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, RoleService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
    roleService = module.get<RoleService>(RoleService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should assign a role to a user', async () => {
    const mockUser = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      passwordHash: 'hashedpassword',
      createdAt: new Date(),
      deleted: false,
      deletedAt: null,
    };

    const mockRole = {
      id: 1,
      name: 'Admin',
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);
    jest.spyOn(roleService, 'findById').mockResolvedValue(mockRole);
    jest.spyOn(userRepository, 'assignRole').mockResolvedValue(mockRole);

    const assignRoleDto: AssignRoleDto = { roleId: 1 };

    const result = await userService.assignRole(1, 1, assignRoleDto);

    expect(result).toEqual(mockRole);
    expect(userRepository.create).toHaveBeenCalledWith(1, 1, '1');
  });

  it('should throw error if user not found', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

    const assignRoleDto: AssignRoleDto = { roleId: 1 };

    await expect(userService.assignRole(1, 1, assignRoleDto)).rejects.toThrow(
      HttpException,
    );
  });

  it('should throw error if role not found', async () => {
    const mockUser = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      passwordHash: 'hashedpassword',
      createdAt: new Date(),
      deleted: false,
      deletedAt: null,
    };

    jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);
    jest.spyOn(roleService, 'findById').mockResolvedValue(null);

    const assignRoleDto: AssignRoleDto = { roleId: 1 };

    await expect(userService.assignRole('1', 1, assignRoleDto)).rejects.toThrow(
      HttpException,
    );
  });
});
