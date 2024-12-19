import { Body, Controller, Delete, Get, HttpCode, Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { GroupService } from './group.service';
import { GroupCreateRequest } from './dto/group-create-request';
import { GroupResponseDto } from './dto/group-response-dto';
import { GroupUpdateRequest } from './dto/group-update-request';
import { SearchRequest } from '../common/dto/search-request';
import { SearchResponse } from '../common/dto/search-response';

import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';

@SetMetadata('roles', ['ADMIN'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/group')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  public async create(@Body() request: GroupCreateRequest): Promise<GroupResponseDto> {
    return await this.service.create(request);
  }

  @Put()
  public async update(@Body() request: GroupUpdateRequest): Promise<GroupResponseDto> {
    return await this.service.update(request);
  }

  @Get('/:id')
  public async getById(id: string): Promise<GroupResponseDto> {
    return await this.service.getById(id);
  }

  @Post('/list')
  @HttpCode(200)
  public async getList(@Body() request: SearchRequest): Promise<SearchResponse<GroupResponseDto>> {
    return await this.service.getList(request);
  }

  @Delete('/:id')
  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}
