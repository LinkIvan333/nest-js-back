import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupModel } from '../groups/group.model';

@Entity({ name: 'users' })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // @Column()
  // mail: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  number: string;

  // @OneToOne(() => GroupModel)
  // @JoinColumn()
  // group: GroupModel;

  constructor(login: string, password: string, salt: string, id?: number) {
    super();
    this.id = id;
    this.name = null;
    this.number = null;
    // this.group = null;
    this.login = login;
    this.password = password;
    this.salt = salt;
  }
}
