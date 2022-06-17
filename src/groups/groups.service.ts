import { Injectable } from '@nestjs/common';
import { GroupModel } from './group.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupModel)
    private groupRep: Repository<GroupModel>,
  ) {}

  getUsers(): Promise<GroupModel[]> {
    return this.groupRep.find();
  }

  addUser(name: string): Promise<GroupModel> {
    const User = new GroupModel(name);
    return User.save();
  }
}
