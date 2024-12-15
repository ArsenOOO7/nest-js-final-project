import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Subject } from './domain/subject.entity';
import { SubjectCreateRequest } from './dto/subject-create-request';
import { SubjectUpdateRequest } from './dto/subject-update-request';

@Controller('/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('/list')
  public getList(): Promise<Subject[]> {
    return this.subjectService.getList();
  }

  @Post()
  public async create(@Body() request: SubjectCreateRequest): Promise<Subject> {
    return await this.subjectService.create(request);
  }

  @Put()
  public async update(@Body() request: SubjectUpdateRequest): Promise<Subject> {
    return await this.subjectService.update(request);
  }

  @Delete(':id')
  public async delete(id: string): Promise<void> {
    await this.subjectService.delete(id);
  }
}
