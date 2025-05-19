import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrgDto, UpdateOrgDto } from './organizations.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly orgService: OrganizationsService) {}

  @ApiOperation({ summary: 'Get all organizations (SuperAdmin only)' })
  @ApiResponse({ status: 200, description: 'List of organizations' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SuperAdmin')
  @Get() // GET /users
  async findAll() {
    return this.orgService.findAll();
  }

  @ApiOperation({ summary: 'Get organization by ID (Admin/SuperAdmin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Organization found' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'SuperAdmin')
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.orgService.findById(+id);
  }

  @ApiOperation({ summary: 'Create a new organization (SuperAdmin only)' })
  @ApiBody({ type: CreateOrgDto })
  @ApiResponse({ status: 201, description: 'Organization created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SuperAdmin')
  @Post() // POST /users
  async createUser(@Body() org: CreateOrgDto) {
    return this.orgService.createOrg(org);
  }

  @ApiOperation({ summary: 'Update organization by ID (SuperAdmin only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateOrgDto })
  @ApiResponse({ status: 200, description: 'Organization updated' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SuperAdmin')
  @Patch(':id') // PATCH /users/:id
  async updateUser(@Param('id') id: string, @Body() userUpdate: UpdateOrgDto) {
    return this.orgService.updateOrg(+id, userUpdate);
  }

  @ApiOperation({ summary: 'Delete organization by ID (SuperAdmin only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Organization deleted' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SuperAdmin')
  @Delete(':id') // DELETE /users/:id
  async deleteOrg(@Param('id') id: string) {
    return this.orgService.deleteOrg(+id);
  }
}
