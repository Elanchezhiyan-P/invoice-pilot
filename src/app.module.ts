// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { User } from './users/user.entity';
import { OrganizationsModule } from './organizations/organizations.module';
import { Organization } from './organizations/organization.entity';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { PdfModule } from './pdf/pdf.module';
import { MailModule } from './mail/mail.module';
import { InvoiceItem } from './invoices/invoicesitem.entity';
import { Invoice } from './invoices/invoices.entity';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        const host = config.get('DB_HOST');
        const port = config.get('DB_PORT');
        const username = config.get('DB_USERNAME');
        const password = config.get('DB_PASSWORD');
        const db = config.get('DB_NAME');

        console.log('mail ', config.get('EMAIL_USER'));
        console.log('password ', config.get('EMAIL_PASS'));

        console.log('[DB DEBUG] HOST:', host);
        console.log('[DB DEBUG] PORT:', port);
        console.log('[DB DEBUG] USERNAME:', username);
        console.log(
          '[DB DEBUG] PASSWORD:',
          password ? '***hidden***' : 'undefined',
        );
        console.log('[DB DEBUG] DB NAME:', db);

        return {
          type: 'postgres',
          host,
          port: +port,
          username,
          password: String(password),
          database: db,
          entities: [User, Role, Organization, Invoice, InvoiceItem],
          synchronize: true,
        };
      },
    }),

    UsersModule,
    OrganizationsModule,
    AuthModule,
    RoleModule,
    InvoicesModule,
    PdfModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
