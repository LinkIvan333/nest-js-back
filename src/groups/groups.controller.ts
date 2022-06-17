import { Body, Controller, Get, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupModel } from './group.model';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('groups')
  async getUsers(): Promise<GroupModel[]> {
    return this.groupsService.getUsers();
  }

  @Post('groups')
  async addUser(@Body() user: { name: string }) {
    return await this.groupsService.addUser(user.name);
  }
}
