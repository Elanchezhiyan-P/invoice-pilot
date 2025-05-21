import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, ValidateNested } from 'class-validator';
import { UserSummaryDto } from 'src/users/users.dto';

export class CreateInvoiceItemDto {
  @ApiProperty({ example: 'Widget A' })
  @IsString()
  description: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  qty: number;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  total: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 'INV-2025-001' })
  @IsString()
  invoiceNumber: string;

  @ApiProperty({ example: 'May 2025' })
  @IsString()
  month: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  subtotal: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 8.0 })
  @IsNumber()
  taxRate: number;

  @ApiProperty({ example: 14.4 })
  @IsNumber()
  totalTax: number;

  @ApiProperty({ example: 194.4 })
  @IsNumber()
  totalDue: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  shipping: number;

  @ApiProperty({ example: 'Monthly invoice for client XYZ' })
  @IsString()
  remarks: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ type: [CreateInvoiceItemDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];
}

export class InvoiceItemResponseDto {
  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  qty: number;

  @ApiProperty()
  @Expose()
  unitPrice: number;

  @ApiProperty()
  @Expose()
  total: number;
}

export class InvoiceResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  invoiceNumber: string;

  @ApiProperty()
  @Expose()
  month: string;

  @ApiProperty()
  @Expose()
  subtotal: number;

  @ApiProperty()
  @Expose()
  discount: number;

  @ApiProperty()
  @Expose()
  taxRate: number;

  @ApiProperty()
  @Expose()
  totalTax: number;

  @ApiProperty()
  @Expose()
  totalDue: number;

  @ApiProperty()
  @Expose()
  shipping: number;

  @ApiProperty()
  @Expose()
  remarks: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: [InvoiceItemResponseDto] })
  @Expose()
  @Type(() => InvoiceItemResponseDto)
  items: InvoiceItemResponseDto[];

  @ApiProperty({ type: UserSummaryDto })
  @Expose()
  @Type(() => UserSummaryDto)
  user: UserSummaryDto;
}
