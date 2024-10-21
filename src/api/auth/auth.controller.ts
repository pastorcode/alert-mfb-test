import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SuccessResponseDto } from 'src/utils/dtos/success-reponse.dto';
import { SuccessMessages } from 'src/utils/constant/success-messages';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/utils/decorators';
import { JwtGuard } from 'src/utils/guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    try {
      const response = await this.authService.register(data);
      return new SuccessResponseDto(SuccessMessages.REGISTERED, response);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      const response = await this.authService.login(data);
      return new SuccessResponseDto(SuccessMessages.LOGGED_IN, response);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async me(@GetUser() user: User) {
    try {
      console.log(user);
      const userId = user.id;
      const response = await this.authService.me(userId);
      return new SuccessResponseDto(SuccessMessages.USER_FETCHED, response);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
