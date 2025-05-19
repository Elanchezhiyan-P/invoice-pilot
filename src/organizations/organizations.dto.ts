import { ApiProperty } from '@nestjs/swagger';

export class CreateOrgDto {
  @ApiProperty({ example: 'Acme Corp' })
  Name: string;

  @ApiProperty({ example: 'admin@acme.com' })
  Email: string;

  @ApiProperty({ example: '123 Main St, New York, NY' })
  Address: string;

  @ApiProperty({ example: '1234567890' })
  PhoneNumber: string;

  @ApiProperty({ example: 1 })
  CreatedBy: number;

  @ApiProperty({ example: '2025-05-19T13:45:00.000Z', required: false })
  CreatedAt?: Date;
}

export class UpdateOrgDto {
  @ApiProperty({ example: 'Acme Corp', required: false })
  Name: string;

  @ApiProperty({ example: 'admin@acme.com', required: false })
  Email: string;

  @ApiProperty({ example: '123 Main St, New York, NY', required: false })
  Address: string;

  @ApiProperty({ example: '1234567890', required: false })
  PhoneNumber: string;
}
