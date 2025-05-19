import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  lastname: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: '9876543210' })
  phoneNumber: string;

  @ApiProperty({ example: 1 })
  orgId: number;

  @ApiProperty({ enum: ['SuperAdmin', 'Admin', 'User'], example: 'Admin' })
  role: 'SuperAdmin' | 'Admin' | 'User';

  @ApiProperty({ example: 'StrongPass123!' })
  password: string;

  @ApiProperty({ example: 1 })
  createdBy: number;

  @ApiProperty({ example: '2025-05-19T12:00:00.000Z', required: false })
  createdAt?: Date;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John', required: false })
  firstname?: string;

  @ApiProperty({ example: 'Doe', required: false })
  lastname?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  email?: string;

  @ApiProperty({
    enum: ['SuperAdmin', 'Admin', 'User'],
    example: 'Admin',
    required: false,
  })
  role?: 'SuperAdmin' | 'Admin' | 'User';

  @ApiProperty({ example: 'NewSecurePassword123!', required: false })
  password?: string;
}
