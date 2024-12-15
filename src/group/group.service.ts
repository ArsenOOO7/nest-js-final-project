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

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly repository: Repository<Group>,
    private readonly mapper: GroupMapper,
  ) {}

  public async create(request: GroupCreateRequest): Promise<GroupResponseDto> {
    return this.mapper.asGroupResponseDto(
      await this.repository.save({ ...request }),
    );
  }

  public async update(request: GroupUpdateRequest): Promise<GroupResponseDto> {
    const group: Group = await this.repository.findOne({
      where: { id: request.id },
    });
    this.mapper.applyGroupUpdateRequest(group, request);
    return this.mapper.asGroupResponseDto(await this.repository.save(group));
  }

  public async getById(id: string): Promise<GroupResponseDto> {
    return this.mapper.asGroupResponseDto(
      await this.repository.findOne({
        where: { id: id },
      }),
    );
  }

  public async getList(request: SearchRequest): Promise<SearchResponse<GroupResponseDto>>{
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

  public async delete(id: string): Promise<void> {
    const group: Group = await this.repository.findOne({
      where: { id: id },
    });
    await this.repository.delete(group.id);
  }
}
