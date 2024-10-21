import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllUserQueryDto } from './dto/get-all-user-query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * Repository responsible for database operations related to the user entity
 */
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new user in the database.
   *
   * @param {Prisma.UserCreateInput} data
   * @returns {Promise<User>}
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  /**
   *  Gets all user in the databse
   *
   * @param {GetAllUserQueryDto} query
   * @returns {Promise<{ users: User[]; total: number }>}
   */
  async findAll(query: GetAllUserQueryDto) {
    const { page = 1, perPage = 10, keyword, role } = query;
    const skip = page && perPage ? (page - 1) * perPage : 0;
    const take = perPage ? Number(perPage) : 10;
    const where: any = {
      AND: [{ deleted: false }],
    };

    if (keyword) {
      where.OR = [
        { name: { contains: keyword, mode: 'insensitive' } },
        { email: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.AND.push({
        roles: {
          some: {
            name: { contains: role, mode: 'insensitive' },
          },
        },
      });
    }

    const users = await this.prismaService.user.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        roles: true,
      },
    });
    const total = await this.prismaService.user.count({ where });
    return { users, total };
  }

  /**
   * Find user by email
   * @param {string} email
   * @returns {Promise<User | null>}
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  /**
   * Find user by id
   * @param {number} id
   * @returns {Promise<User | null>}
   */
  async findById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  /**
   * Update user by id
   *
   * @param {number} id
   * @param {Prisma.UserUpdateInput} data
   * @returns {Promise<User>}
   */
  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({ where: { id }, data });
  }

  /**
   * Delete user by id
   *
   * @param {string} id
   * @returns {Promise<User>}
   */
  async delete(id: number): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { deleted: true, deletedAt: new Date() },
    });
  }
}
