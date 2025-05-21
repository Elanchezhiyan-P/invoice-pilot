import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateInvoiceDto } from './invoices.dto';
import { InvoicesService } from './invoices.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoleName } from 'src/role/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@ApiBearerAuth('access-token')
@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new invoice' })
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateInvoiceDto) {
    console.log([CreateInvoiceDto]);
    return this.invoicesService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all invoices by user ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of invoices returned successfully.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  getByUser(@Param('id') userId: number) {
    return this.invoicesService.getByUser(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Download invoice PDF by invoice ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Invoice ID' })
  @ApiResponse({
    status: 200,
    description: 'PDF invoice file',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id/pdf')
  async downloadInvoicePdf(@Param('id') id: number, @Res() res: Response) {
    const pdf = await this.invoicesService.generateInvoicePdf(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Invoice-${id}.pdf"`,
    );
    res.send(pdf);
  }
}
