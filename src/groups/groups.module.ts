import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModel } from './group.model';
import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupModel])],
  exports: [TypeOrmModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
