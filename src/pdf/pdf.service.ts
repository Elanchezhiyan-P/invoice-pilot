import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { Invoice } from 'src/invoices/invoices.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generateInvoicePdf(invoice: Invoice): Promise<Buffer> {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'invoice.template.html',
    );
    console.log(
      'generateInvoicePdf function started and template path ',
      templatePath,
    );
    const html = await fs.readFile(templatePath, 'utf-8');

    const compiled = Handlebars.compile(html);
    const filledHtml = compiled(this.buildTemplateData(invoice));

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(filledHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4' }));
    await browser.close();
    console.log('generateInvoicePdf function ended');
    return pdfBuffer;
  }

  private buildTemplateData(invoice: Invoice) {
    const { user, items } = invoice;
    const subtotal = items.reduce((sum, i) => sum + Number(i.total), 0);
    const netTotal = subtotal - invoice.discount;
    const taxAmount = (netTotal * invoice.taxRate) / 100;
    const totalDue = netTotal + taxAmount + invoice.shipping;

    return {
      companyName: 'Invoice Pilot Inc.',
      address: '123 Main Street',
      contact: 'billing@invoicepilot.com',
      date: new Date().toLocaleDateString(),
      billTo: {
        name: `${user.firstname} ${user.lastname}`,
        company: 'Client Company', // Optional
        address: 'Client Address', // Optional
        phone: user.phoneNumber,
        email: user.email,
      },
      items: items.map((i) => ({
        description: i.description,
        qty: i.qty,
        unitPrice: i.unitPrice,
        total: i.total,
      })),
      subtotal,
      discount: invoice.discount,
      netTotal,
      taxRate: invoice.taxRate,
      taxAmount: taxAmount.toFixed(2),
      shipping: invoice.shipping,
      totalDue: totalDue.toFixed(2),
    };
  }
}
