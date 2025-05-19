import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(role?: 'SuperAdmin' | 'Admin' | 'User') {
    if (role) {
      return await this.userRepo.find({ where: { role } });
    }
    return await this.userRepo.find();
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    user.password = '';
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    return await this.userRepo.save(user);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.findById(id);
    const updated = this.userRepo.merge(user, dto);
    return await this.userRepo.save(updated);
  }

  async deleteUser(id: number) {
    const user = await this.findById(id);
    await this.userRepo.delete(id);
    return user;
  }
}
