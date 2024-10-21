import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

describe('AuthService - Login', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, PrismaService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should successfully log in the user and return JWT', async () => {
    const mockUser = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      passwordHash: '$2b$10$0UfkrUZeEJPwbFop7.I4UeggIBP33tQPAL9r8n1UIrS5IRW/W7H.i',
      createdAt: new Date(),
      deleted: false,
      deletedAt: null,
    };

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
    jest.spyOn(authService, 'comparePassword').mockResolvedValue(true);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockJwtToken');

    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await authService.login(loginDto);

    expect(result.accessToken).toEqual('mockJwtToken');
  });

  it('should throw error for invalid password', async () => {
    const mockUser = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      passwordHash: '$2b$10$0UfkrUZeEJPwbFop7.I4UeggIBP33tQPAL9r8n1UIrS5IRW/W7H.i',
      createdAt: new Date(),
      deleted: false,
      deletedAt: null,
    };

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
    jest.spyOn(authService, 'comparePassword').mockResolvedValue(false);

    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    await expect(authService.login(loginDto)).rejects.toThrow(HttpException);
  });

  it('should throw error if user is not found', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    await expect(authService.login(loginDto)).rejects.toThrow(HttpException);
  });
});
