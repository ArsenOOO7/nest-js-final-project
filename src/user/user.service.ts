import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserCreateRequest } from './dto/user-create-request';
import { UserResponseDto } from './dto/user-response-dto';
import { UserMapper } from './mapper/user.mapper';
import { Injectable } from "@nestjs/common";
import { UserUpdateRequest } from './dto/user-update-request';
import { NotFoundError } from 'rxjs';
import { SearchRequest } from '../common/dto/search-request';
import { SearchResponse } from '../common/dto/search-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly mapper: UserMapper,
  ) {}

  public async create(request: UserCreateRequest): Promise<UserResponseDto> {
    console.log(request.firstName);
    const user: User = await this.repository.save({ ...request });
    return this.mapper.asUserResponseDto(user);
  }

  public async update(request: UserUpdateRequest): Promise<UserResponseDto> {
    const user: User = await this.repository.findOne({
      where: { id: request.id },
    });
    if (!user) {
      throw new NotFoundError(`User with id ${request.id} not found.`);
    }

    this.mapper.applyUserUpdateRequest(user, request);
    const updated: User = await this.repository.save(user);
    return this.mapper.asUserResponseDto(updated);
  }

  public async getById(id: string): Promise<UserResponseDto> {
    return this.mapper.asUserResponseDto(
      await this.repository.findOne({
        where: { id: id },
      }),
    );
  }

  public async getList(request: SearchRequest,): Promise<SearchResponse<UserResponseDto>> {
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

  public async delete(id: string): Promise<void> {
    const user: User = await this.repository.findOne({
      where: { id: id },
    });
    await this.repository.delete(user.id);
  }
}
