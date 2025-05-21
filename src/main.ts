import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { OrganizationsService } from './organizations/organizations.service';
import { UsersService } from './users/users.service';
import { Role } from './role/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable CORS
  app.enableCors();

  //Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('InvoicePilot API')
    .setDescription('API documentation for InvoicePilot')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
    deepScanRoutes: true,
    operationIdFactory: (controllerKey, methodKey) => methodKey,
  });
  document.tags = [
    { name: 'Auth', description: 'Authentication' },
    { name: 'Users', description: 'User Management' },
    { name: 'Invoices', description: 'Invoice Handling' },
    { name: 'Organizations', description: 'Organization Management' },
  ];
  SwaggerModule.setup('swagger', app, document);

  // Seed Organization, roles and SuperAdmin
  const orgService = app.get(OrganizationsService);
  const userService = app.get(UsersService);

  const existingOrgs = await orgService.findAll();
  if (existingOrgs.length === 0) {
    const org = await orgService.createOrg({
      Name: 'Default',
      Email: 'Info@invoicepilot.com',
      Address: '100 Main Street',
      PhoneNumber: '9999999999',
      CreatedBy: 0,
    });

    console.log('✅ Organization roles');

    const roleRepo = app.get(getRepositoryToken(Role));

    const existingRoles = await roleRepo.find();
    if (existingRoles.length === 0) {
      await roleRepo.save([
        {
          name: 'SuperAdmin',
          description: 'System-level access to all features and tenants',
        },
        {
          name: 'Admin',
          description: 'Organization-level admin with user and billing control',
        },
        {
          name: 'User',
          description: 'Regular end-user with restricted access',
        },
      ]);
      console.log('✅ Seeded roles: SuperAdmin, Admin, User');
    }

    const existingUser = await userService
      .findByEmail('superadmin@invoicepilot.com')
      .catch(() => null);

    if (!existingUser) {
      await userService.createUser({
        firstname: 'Tom',
        lastname: 'Cruise',
        email: 'tomcruise@invoicepilot.com',
        phoneNumber: '9876543210',
        orgId: org.id,
        roleId: 1,
        password: 'Tom@321',
        createdBy: 0,
      });
      console.log('✅ SuperAdmin user seeded.');
    }
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
