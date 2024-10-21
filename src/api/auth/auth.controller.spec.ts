import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

describe('AuthService - Register', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, PrismaService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should successfully register a new user', async () => {
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

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(userService, 'create').mockResolvedValue(mockUser);

    const registerDto: RegisterDto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'Password123@',
    };

    const result = await authService.register(registerDto);

    expect(result).toEqual(mockUser);
    expect(userService.create).toHaveBeenCalledWith(registerDto);
  });

  it('should throw error if user already exists', async () => {
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

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);

    const registerDto: RegisterDto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Password123@',
      confirmPassword: 'Password123@',
    };

    await expect(authService.register(registerDto)).rejects.toThrow(
      HttpException,
    );
  });
});
