import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoices.entity';
import { InvoiceItem } from './invoicesitem.entity';
import { User } from 'src/users/user.entity';
import { CreateInvoiceDto, InvoiceResponseDto } from './invoices.dto';
import { MailService } from 'src/mail/mail.service';
import { PdfService } from 'src/pdf/pdf.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,

    @InjectRepository(InvoiceItem)
    private readonly itemRepo: Repository<InvoiceItem>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly mailService: MailService,
    private readonly pdfService: PdfService,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const items = dto.items.map((item) => this.itemRepo.create(item));

    const invoice = this.invoiceRepo.create({
      invoiceNumber: dto.invoiceNumber,
      month: dto.month,
      subtotal: dto.subtotal,
      discount: dto.discount,
      taxRate: dto.taxRate,
      totalTax: dto.totalTax,
      totalDue: dto.totalDue,
      shipping: dto.shipping,
      remarks: dto.remarks,
      user,
      items,
    });

    const saved = await this.invoiceRepo.save(invoice);

    const pdf = await this.pdfService.generateInvoicePdf(saved);
    await this.mailService.sendInvoiceEmail(user.email, pdf, dto.month);

    return saved;
  }

  async getByUser(userId: number): Promise<InvoiceResponseDto[]> {
    const invoices = await this.invoiceRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'user'],
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(InvoiceResponseDto, invoices, {
      excludeExtraneousValues: true,
    });
  }

  async generateInvoicePdf(id: number): Promise<Buffer> {
    const invoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: ['user', 'items'],
    });

    if (!invoice) throw new NotFoundException('Invoice not found');
    return this.pdfService.generateInvoicePdf(invoice);
  }
}
