import { Body, Controller, Delete, Get, HttpCode, Injectable, Post, Put, UseGuards } from "@nestjs/common";
import { UserCreateRequest } from './dto/user-create-request';
import { UserResponseDto } from './dto/user-response-dto';
import { UserService } from './user.service';
import { UserUpdateRequest } from './dto/user-update-request';
import { SearchRequest } from '../common/dto/search-request';
import { SearchResponse } from '../common/dto/search-response';
import { Roles, RolesGuard } from "../auth/guard/role.guard";
import { JwtAuthGuard } from "../auth/guard/jwt.auth.guard";

@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  public async create(@Body() request: UserCreateRequest): Promise<UserResponseDto> {
    return await this.service.create(request);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  public async update(@Body() request: UserUpdateRequest): Promise<UserUpdateRequest> {
    return await this.service.update(request);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  public async getById(id: string): Promise<UserResponseDto> {
    return await this.service.getById(id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/list')
  @HttpCode(200)
  public async getList(@Body() request: SearchRequest,): Promise<SearchResponse<UserResponseDto>> {
    return await this.service.getList(request);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}
