import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { GroupModel } from '../groups/group.model';
import { createHmac, randomBytes } from 'crypto';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const crypto = require('node:crypto');
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private usersRep: Repository<UserModel>,
    @InjectRepository(GroupModel)
    private groupsRep: Repository<GroupModel>,
  ) {}

  async getUsers(id?: number): Promise<UserModel[]> {
    if (id) {
      return this.usersRep.find({ where: { id: id } });
    }
    return this.usersRep.find();
  }

  async getUserByLogin(login: string): Promise<UserModel | null> {
    return this.usersRep.findOne({ where: { login: login } });
  }

  async addUser(login: string, password: string): Promise<UserModel> {
    const salt = randomBytes(16).toString('base64');
    const hmac = createHmac('sha256', salt + password)
      .digest()
      .toString('base64');
    const User = new UserModel(login, hmac, salt);
    return User.save();
  }

  async editUser(
    id: number,
    name?: string,
    number?: string,
    groupID?: number,
  ): Promise<UpdateResult> {
    const group = await this.groupsRep.findOneBy({ id: groupID });
    const User = await this.usersRep.findOneBy({ id: id });
    const updatedUser = {
      ...User,
      name: name || User.name,
      number: number || User.number,
      // group: group || User.group,
    };
    return this.usersRep.update(updatedUser.id, updatedUser);
  }
}
