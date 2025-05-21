import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/organizations/organization.entity';
import { RoleName } from 'src/role/role.enum';
import { Role } from 'src/role/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findAll(roleName?: RoleName) {
    const query = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.organization', 'organization');

    if (roleName) {
      query.where('role.name = :roleName', { roleName });
    }

    return await query.getMany();
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
    const org = await this.orgRepo.findOne({ where: { id: dto.orgId } });
    if (!org) {
      throw new BadRequestException('Organization does not exist');
    }

    const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
    if (!role) {
      throw new BadRequestException('Role does not exist');
    }

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
