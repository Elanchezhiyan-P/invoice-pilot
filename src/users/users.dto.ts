import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastname: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  orgId: number;

  @ApiProperty({
    example: 2,
    description: 'Role ID (1: SuperAdmin, 2: Admin, 3: User)',
  })
  @IsNumber()
  roleId: number;

  @ApiProperty({ example: 'StrongPass123!' })
  @IsString()
  password: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  createdBy: number;

  @ApiProperty({ example: '2025-05-19T12:00:00.000Z', required: false })
  createdAt?: Date;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 2,
    description: 'Role ID (optional)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  roleId?: number;

  @ApiProperty({ example: 'NewSecurePassword123!', required: false })
  @IsOptional()
  @IsString()
  password?: string;
}

export class UserSummaryDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  firstname: string;

  @ApiProperty()
  @Expose()
  lastname: string;

  @ApiProperty()
  @Expose()
  email: string;
}
