import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './domain/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectCreateRequest } from './dto/subject-create-request';
import { SubjectUpdateRequest } from './dto/subject-update-request';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject) private readonly repository: Repository<Subject>,
  ) {}

  public async create(request: SubjectCreateRequest): Promise<Subject> {
    return this.repository.save({ ...request });
  }

  public async update(request: SubjectUpdateRequest): Promise<Subject> {
    const subject: Subject = await this.repository.findOne({
      where: { id: request.id },
    });
    subject.name = request.name;
    return this.repository.save(subject);
  }

  public async getList(): Promise<Subject[]> {
    return await this.repository.find();
  }

  public async delete(id: string): Promise<void> {
    const subject: Subject = await this.repository.findOne({
      where: { id: id },
    });

    await this.repository.delete(subject.id);
  }
}
