import { Injectable } from '@nestjs/common';
import { GroupCreateRequest } from './dto/group-create-request';
import { GroupResponseDto } from './dto/group-response-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './domain/group.entity';
import { Repository } from 'typeorm';
import { GroupMapper } from './mapper/group.mapper';
import { GroupUpdateRequest } from './dto/group-update-request';
import { SearchRequest } from '../common/dto/search-request';
import { SearchResponse } from '../common/dto/search-response';
import { BaseService } from '../common/base.service';
import { request } from 'express';

@Injectable()
export class GroupService extends BaseService<Group> {
  constructor(
    @InjectRepository(Group) private readonly repository: Repository<Group>,
    private readonly mapper: GroupMapper,
  ) {
    super();
  }

  public async create(request: GroupCreateRequest): Promise<GroupResponseDto> {
    return this.mapper.asGroupResponseDto(
      await super.createInternal({ ...request, id: undefined }),
    );
  }

  public async update(request: GroupUpdateRequest): Promise<GroupResponseDto> {
    const group: Group = await this.getById(request.id);
    this.mapper.applyGroupUpdateRequest(group, request);
    return this.mapper.asGroupResponseDto(await super.updateInternal(group));
  }

  public async getList(
    request: SearchRequest,
  ): Promise<SearchResponse<GroupResponseDto>> {
    const [groups, total]: [Group[], number] =
      await this.repository.findAndCount({
        take: request.limit,
        skip: request.offset,
      });

    return {
      elements: groups,
      total: total,
    };
  }

  protected getEntityName(): string {
    return Group.name;
  }

  protected getRepository(): Repository<Group> {
    return this.repository;
  }
}
