import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [GroupsModule, TypeOrmModule.forFeature([UserModel])],
  exports: [TypeOrmModule, UsersModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
