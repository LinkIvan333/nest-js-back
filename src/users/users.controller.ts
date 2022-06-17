import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.usersService.getUsers();
  }

  @Get('users/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel[]> {
    return this.usersService.getUsers(id);
  }

  @Post('users')
  async registerUser(
    @Body()
    user: {
      login: string;
      password: string;
    },
  ) {
    return await this.usersService.addUser(user.login, user.password);
  }

  @Put('users/:id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    user: {
      name?: string;
      number?: string;
      groupID?: number;
    },
  ) {
    return await this.usersService.editUser(
      id,
      user.name,
      user.number,
      user.groupID,
    );
  }
}
