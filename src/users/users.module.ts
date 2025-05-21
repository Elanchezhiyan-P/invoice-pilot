import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organizations/organization.entity';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, Role])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
