# 🧾 InvoicePilot

**InvoicePilot** is a scalable, multi-tenant invoice management API built with **NestJS** and **PostgreSQL**. It supports JWT authentication, role-based access control, and is ideal for SaaS-style billing platforms where different organizations have their own user sets and permissions.

---

## 🚀 Features

- 🏢 **Multi-Tenant Organization Management**

  - SuperAdmins create organizations
  - OrgAdmins manage users, customers, and invoices within their org

- 🔐 **Role-Based Access Control (RBAC)**

  - Roles: `SuperAdmin`, `Admin`, `User`
  - Custom `@Roles()` decorator and guard system

- 🔑 **JWT Authentication**

  - Login endpoint returns Bearer token
  - All secure endpoints are protected with `JwtAuthGuard` + `RolesGuard`

- 📄 **Invoice Management (Coming Soon)**

  - Create and manage customers
  - Generate and send PDF invoices
  - Email integration with SMTP/Mailtrap

- 🧰 **Modular Codebase**
  - Organized modules: `Users`, `Auth`, `Organizations`, `Invoices`
  - Scalable structure ready for production

---

## 🛠 Tech Stack

| Technology  | Purpose                         |
| ----------- | ------------------------------- |
| NestJS      | Backend framework               |
| TypeORM     | Database ORM                    |
| PostgreSQL  | Primary database                |
| JWT         | Authentication                  |
| Passport.js | Strategy-based auth             |
| Bcrypt      | Password hashing                |
| Dotenv      | Environment configuration       |
| Mailer      | Email integration (coming soon) |

---

## 📁 Project Structure

```
src/
├── auth/ # Auth module (JWT, login, strategy)
├── users/ # User module (CRUD, roles)
├── organizations/ # Organization module
├── invoices/ # Invoice logic (coming soon)
├── main.ts # App bootstrap
├── app.module.ts # Global module setup
```

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Elanchezhiyan-P/invoice-pilot.git
cd invoice-pilot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a .env file at the project root:

```
# .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_db_password
DB_NAME=invoicepilot
JWT_SECRET=your_super_secret
EMAIL_USER=xxxx@xxxx.com
EMAIL_PASS=your_super_secret_app_password
```

### 4. Run the Application

```bash
npm run start:dev
```

Visit: http://localhost:3000

## 🔐 Authentication

Login Endpoint

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@company.com",
  "password": "securepassword"
}

```

Response:

```
{
  "access_token": "your.jwt.token"
}
```

Use this token in headers:

```
Authorization: Bearer <token>
```

## 🧾 Example User Roles

| Role       | Permissions                              |
| ---------- | ---------------------------------------- |
| SuperAdmin | Create orgs and admins                   |
| Admin      | Manage org users & customers             |
| User       | Limited access to invoices or their data |

## 📌 Sample Output Snippet

### 🔐 Swagger UI

<img src="./assets/swagger-ui.png" alt="Swagger UI" width="100%" />

### 📩 Email Screenshot

<img src="./assets/email.png" alt="Email received" width="100%" />

### 🧾 Invoice PDF Preview

<img src="./assets/invoice-pdf-image.png" alt="PDF Screenshot" width="100%" />

### 📄 Sample PDF

[📥 Download Invoice PDF](./assets/invoice-may-2025.pdf)

## 🧰 Dev Tools

- VS Code debugger support (.vscode/launch.json)

- Hot reload with npm run start:dev

- Swagger

## 📄 License

MIT © 2025 **Elanchezhiyan P**

---

## 📌 Need More?

Let me know if you'd like to extend this project with:

- 📬 **Postman Collection** – Ready-to-import collection for testing all endpoints
- 🐳 **Docker Setup** – `Dockerfile` and `docker-compose.yml` for PostgreSQL and NestJS containerization

> I can generate any of these instantly to help you scale or deploy your API with confidence.
