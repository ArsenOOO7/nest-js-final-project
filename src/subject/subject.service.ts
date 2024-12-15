import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './domain/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectCreateRequest } from './dto/subject-create-request';
import { SubjectUpdateRequest } from './dto/subject-update-request';
import { BaseService } from '../common/base.service';
import { request } from 'express';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  constructor(
    @InjectRepository(Subject) private readonly repository: Repository<Subject>,
  ) {
    super();
  }

  public async create(request: SubjectCreateRequest): Promise<Subject> {
    return super.createInternal({ ...request, id: undefined });
  }

  public async update(request: SubjectUpdateRequest): Promise<Subject> {
    const subject: Subject = await this.getById(request.id);
    subject.name = request.name;
    return super.updateInternal(subject);
  }

  public async getList(): Promise<Subject[]> {
    return await this.repository.find();
  }

  protected getEntityName(): string {
    return Subject.name;
  }

  protected getRepository(): Repository<Subject> {
    return this.repository;
  }
}
