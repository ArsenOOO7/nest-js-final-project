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
  public create(@Body() request: SubjectCreateRequest): Promise<Subject> {
    return this.subjectService.create(request);
  }

  @Put()
  public update(@Body() request: SubjectUpdateRequest): Promise<Subject> {
    return this.subjectService.update(request);
  }

  @Delete(':id')
  public delete(id: string): void {
    this.subjectService.delete(id);
  }
}
