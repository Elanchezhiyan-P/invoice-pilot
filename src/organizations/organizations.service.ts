import { Injectable, NotFoundException } from '@nestjs/common';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrgDto, UpdateOrgDto } from './organizations.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  async findAll() {
    return await this.orgRepo.find();
  }

  async findById(id: number) {
    const user = await this.orgRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async createOrg(dto: CreateOrgDto) {
    const org = this.orgRepo.create({ ...dto });
    return await this.orgRepo.save(org);
  }

  async updateOrg(id: number, dto: UpdateOrgDto) {
    const org = await this.findById(id);
    const updated = this.orgRepo.merge(org, dto);
    return await this.orgRepo.save(updated);
  }

  async deleteOrg(id: number) {
    const org = await this.findById(id);
    await this.orgRepo.delete(id);
    return org;
  }
}
