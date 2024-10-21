import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAllUserQueryDto } from './dto/get-all-user-query.dto';
import { SuccessResponseDto } from 'src/utils/dtos/success-reponse.dto';
import { SuccessMessages } from 'src/utils/constant/success-messages';
import { RolesGuard } from 'src/utils/guard/role.guard';
import { JwtGuard } from 'src/utils/guard/jwt.guard';
import { Roles } from 'src/utils/decorators';

@ApiTags('User')
@Controller('users')
/**
 * Controller responsible for handling user operations and logic
 * @class UserController
 * */
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('Admin', 'User')
  @UseGuards(JwtGuard, RolesGuard)
  async findAll(@Query() query: GetAllUserQueryDto) {
    try {
      const response = await this.userService.findAll(query);
      return new SuccessResponseDto(SuccessMessages.USER_FETCHED, response);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
      console.log(data);
      const response = await this.userService.update(+id, data);
      return new SuccessResponseDto(SuccessMessages.USER_UPDATED, response);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @Roles('Admin')
  @UseGuards(JwtGuard, RolesGuard)
  async remove(@Param('id') id: number) {
    try {
      const response = await this.userService.delete(+id);
      return new SuccessResponseDto(SuccessMessages.USER_DELETED, response);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('assign-role')
}
