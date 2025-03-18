import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from './user.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // empty
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async saveUser(user: Omit<User, 'id'>) {
    return await this.userRepository.save(user);
  }
}
