import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendInvoiceEmail(to: string, pdfBuffer: Buffer, month: string) {
    console.log('Send invoice email: ', to, month);
    await this.mailerService.sendMail({
      to,
      subject: `Invoice for ${month}`,
      text: `Hello, please find your invoice for ${month} attached.`,
      attachments: [
        {
          filename: `Invoice-${month}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
  }
}
