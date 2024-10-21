import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUserQueryDto } from './dto/get-all-user-query.dto';
import { ErrorMessages } from 'src/utils/constant/error-message';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleService } from '../role/role.service';
import { AssignRoleDto } from './dto/assign-role-.dto';

@Injectable()
/**
 * Service responsible for handling user operations and logic
 */
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly roleService: RoleService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.usersRepository.create(
      data as unknown as Prisma.UserCreateInput,
    );
  }

  async findAll(query: GetAllUserQueryDto) {
    try {
      return this.usersRepository.findAll(query);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return this.usersRepository.findById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * finds a user by email
   * @param {string} email - The email of the user to find
   * @returns {Promise<User>}
   */
  async findByEmail(email: string) {
    try {
      return this.usersRepository.findByEmail(email);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Updates a user
   * @param {number} id - The id of the user to update
   * @param {UpdateUserDto} data - The data to update the user with
   * @returns {Promise<User>}
   */
  async update(id: number, data: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new HttpException(
          ErrorMessages.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      console.log(data);
      return this.usersRepository.update(id, data as Prisma.UserUpdateInput);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Deletes a user
   * @param {number} id - The id of the user to delete
   * @returns {Promise<User>}
   */
  async delete(id: number) {
    try {
      return this.usersRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async assignRole(authUserId: number, id: number, data: AssignRoleDto) {
    const roleId = +data.roleId;

    try {
      // Check if user exists
      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new HttpException(
          ErrorMessages.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      // Check if role exists
      const role = await this.roleService.findById(roleId);
      if (!role) {
        throw new HttpException(
          ErrorMessages.ROLE_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      // Check if the auth user exist
      const assignedBy = await this.usersRepository.findById(authUserId);
      if (!assignedBy) {
        throw new HttpException(
          ErrorMessages.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.roleService.createUserRole({
        user: { connect: { id } },
        role: { connect: { id: roleId } },
        assignedBy: { connect: { id: authUserId } },
        assignedAt: new Date(),
      });

      return this.usersRepository.findById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
