import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ErrorMessages } from 'src/utils/constant/error-message';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
/**
 * Service responsible for handling user authentication
 * @class AuthService
 **/
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Logs in a user
   * @param {LoginDto} data - The login data
   * @returns {Promise<{ access_token: string }>}
   **/
  async login(data: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = data;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        ErrorMessages.INVALID_EMAIL_OR_PASSWORD,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await this.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        ErrorMessages.INVALID_EMAIL_OR_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload = { email: user.email, sub: user.id };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Registers a new user
   * @param {RegisterDto} data - The user registration data
   * @returns {Promise<UserResponseDto>}
   **/
  async register(data: RegisterDto): Promise<UserResponseDto> {
    const { firstName, lastName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      throw new HttpException(
        ErrorMessages.PASSWORDS_DO_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.isPasswordStrong(password)) {
      throw new HttpException(
        ErrorMessages.PASSWORD_TOO_WEAK,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if the email is already in use
    const userEmailExist = await this.userService.findByEmail(email);
    if (userEmailExist) {
      throw new HttpException(
        ErrorMessages.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await this.hashPassword(password);
    const user = await this.userService.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return plainToClass(UserResponseDto, user);
  }

  /**
   * Gets the current user
   * @param {number} userId - The id of the user
   * @returns {Promise<UserResponseDto>}
   **/
  public async me(userId: number): Promise<UserResponseDto> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpException(
        ErrorMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      return plainToClass(UserResponseDto, user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Checks if the password is strong
   * @param {string} password - The password to check
   * @returns {boolean}
   **/
  private isPasswordStrong(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Hashes a password
   * @param {string} password - The password to hash
   * @returns {Promise<string>}
   **/
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Compares a password with a hashed password
   * @param {string} password - The password to compare
   * @param {string} $2b$10$0UfkrUZeEJPwbFop7.I4UeggIBP33tQPAL9r8n1UIrS5IRW/W7H.i - The hashed password to compare
   * @returns {Promise<boolean>}
   **/
  public async comparePassword(
    password: string,
    $2b$10$0UfkrUZeEJPwbFop7.I4UeggIBP33tQPAL9r8n1UIrS5IRW/W7H.i: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, $2b$10$0UfkrUZeEJPwbFop7.I4UeggIBP33tQPAL9r8n1UIrS5IRW/W7H.i);
  }
}
