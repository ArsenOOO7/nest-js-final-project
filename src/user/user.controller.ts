import { Body, Controller, Delete, Get, HttpCode, Injectable, Post, Put } from "@nestjs/common";
import { UserCreateRequest } from './dto/user-create-request';
import { UserResponseDto } from './dto/user-response-dto';
import { UserService } from './user.service';
import { UserUpdateRequest } from './dto/user-update-request';
import { SearchRequest } from '../common/dto/search-request';
import { SearchResponse } from '../common/dto/search-response';

@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  public async create(@Body() request: UserCreateRequest): Promise<UserResponseDto> {
    return await this.service.create(request);
  }

  @Put()
  public async update(@Body() request: UserUpdateRequest): Promise<UserUpdateRequest> {
    return await this.service.update(request);
  }

  @Get(':id')
  public async getById(id: string): Promise<UserResponseDto> {
    return await this.service.getById(id);
  }

  @Post('/list')
  @HttpCode(200)
  public async getList(@Body() request: SearchRequest,): Promise<SearchResponse<UserResponseDto>> {
    return await this.service.getList(request);
  }

  @Delete(':id')
  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}
