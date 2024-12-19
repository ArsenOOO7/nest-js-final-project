import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserCreateRequest } from './dto/user-create-request';
import { UserResponseDto } from './dto/user-response-dto';
import { UserMapper } from './mapper/user.mapper';
import { Injectable, SetMetadata, UseGuards } from "@nestjs/common";
import { UserUpdateRequest } from './dto/user-update-request';
import { SearchRequest } from '../common/dto/search-request';
import { SearchResponse } from '../common/dto/search-response';
import { BaseService } from '../common/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly mapper: UserMapper,
  ) {
    super();
  }

  public async create(request: UserCreateRequest): Promise<UserResponseDto> {
    return this.mapper.asUserResponseDto(
      await super.createInternal(this.mapper.asUser(request)),
    );
  }


  public async update(request: UserUpdateRequest): Promise<UserResponseDto> {
    const user: User = await this.getById(request.id);

    this.mapper.applyUserUpdateRequest(user, request);
    return this.mapper.asUserResponseDto(await super.updateInternal(user));
  }

  public async getList(
    request: SearchRequest,
  ): Promise<SearchResponse<UserResponseDto>> {
    const [users, total]: [User[], number] = await this.repository.findAndCount(
      {
        take: request.limit,
        skip: request.offset,
      },
    );
    return {
      elements: this.mapper.asUserResponseDtos(users),
      total: total,
    };
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email: email } } );
  }

  protected getEntityName(): string {
    return User.name;
  }

  protected getRepository(): Repository<User> {
    return this.repository;
  }
}
