import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { LessonService } from './lesson.service';
import { LessonCreateRequest } from './dto/lesson-create.request';
import { LessonResponseDto } from './dto/lesson-response.dto';
import { LessonUpdateRequest } from './dto/lesson-update.request';
import { LessonBoardSearchGroupRequest } from './dto/board/lesson-board-search.group.request';
import { LessonBoardResponseDto } from './dto/board/lesson-board-response.dto';
import { LessonBoardSearchTeacherRequest } from './dto/board/lesson-board-search.teacher.request';

@Controller('/lesson')
export class LessonController {
  constructor(private readonly service: LessonService) {}

  @Post()
  public async create(@Body() request: LessonCreateRequest): Promise<LessonResponseDto> {
    return await this.service.create(request);
  }

  @Put()
  public async update(@Body() request: LessonUpdateRequest): Promise<LessonResponseDto> {
    return await this.service.update(request);
  }

  @Post('/list/group')
  public async getByGroup(@Body() request: LessonBoardSearchGroupRequest): Promise<LessonBoardResponseDto[]> {
    return await this.service.getByGroup(request);
  }

  @Post('/list/teacher')
  public async getByTeacher(@Body() request: LessonBoardSearchTeacherRequest): Promise<LessonBoardResponseDto[]> {
    return await this.service.getByTeacher(request);
  }

  @Get('/:id')
  public async getById(id: string): Promise<LessonResponseDto> {
    return await this.service.findById(id);
  }

  @Delete(':id')
  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}
