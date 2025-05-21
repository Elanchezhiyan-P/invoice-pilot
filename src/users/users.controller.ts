import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleName } from 'src/role/role.enum';

@ApiBearerAuth('access-token')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users by optional role filter' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned successfully.',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: RoleName,
    description: 'Optional role filter',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.SuperAdmin, RoleName.Admin)
  @Get()
  async findAll(@Query('role') role?: RoleName) {
    return this.usersService.findAll(role);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User fetched successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.SuperAdmin, RoleName.Admin)
  @Post() // POST /users
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id') // PATCH /users/:id
  async updateUser(@Param('id') id: string, @Body() userUpdate: UpdateUserDto) {
    return this.usersService.updateUser(+id, userUpdate);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleName.SuperAdmin, RoleName.Admin)
  @Delete(':id') // DELETE /users/:id
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
