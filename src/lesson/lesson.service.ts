import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { Lesson } from './domain/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupService } from '../group/group.service';
import { SubjectService } from '../subject/subject.service';
import { LessonMapper } from './mapper/lesson.mapper';
import { LessonCreateRequest } from './dto/lesson-create.request';
import { LessonResponseDto } from './dto/lesson-response.dto';
import { Group } from '../group/domain/group.entity';
import { User } from '../user/domain/user.entity';
import { UserService } from '../user/user.service';
import { Subject } from '../subject/domain/subject.entity';
import { LessonUpdateRequest } from './dto/lesson-update.request';
import { LessonBoardSearchGroupRequest } from './dto/board/lesson-board-search.group.request';
import { LessonBoardResponseDto } from './dto/board/lesson-board-response.dto';
import { Between, Repository, SelectQueryBuilder } from "typeorm";
import { LessonBoardSearchTeacherRequest } from './dto/board/lesson-board-search.teacher.request';

@Injectable()
export class LessonService extends BaseService<Lesson> {
  constructor(
    @InjectRepository(Lesson) private readonly repository: Repository<Lesson>,
    private readonly groupService: GroupService,
    private readonly subjectService: SubjectService,
    private readonly userService: UserService,
    private readonly mapper: LessonMapper,
  ) {
    super();
  }

  public async create(request: LessonCreateRequest): Promise<LessonResponseDto> {
    const groups: Group[] = await this.groupService.getAll(request.groupIds);
    const teacher: User = await this.userService.getById(request.teacherId);
    const subject: Subject = await this.subjectService.getById(request.subjectId,);

    const lesson: Lesson = this.mapper.asLesson(request, teacher, subject, groups);
    return this.mapper.asLessonResponseDto(await super.createInternal(lesson));
  }

  public async update(request: LessonUpdateRequest): Promise<LessonResponseDto> {
    const lesson: Lesson = await super.getById(request.id);
    const groups: Group[] = await this.groupService.getAll(request.groupIds);
    const teacher: User = await this.userService.getById(request.teacherId);
    const subject: Subject = await this.subjectService.getById(request.subjectId,);

    this.mapper.applyLessonUpdateRequest(request, teacher, subject, groups, lesson);
    return this.mapper.asLessonResponseDto(lesson);
  }

  public async getByGroup(request: LessonBoardSearchGroupRequest): Promise<LessonBoardResponseDto[]> {
    const lessons: Lesson[] = await this.repository
      .createQueryBuilder('lesson')
      .innerJoinAndSelect('lesson.groups', 'group')
      .innerJoinAndSelect('lesson.teacher', 'teacher')
      .innerJoinAndSelect('lesson.subject', 'subject')
      .where(
        'group.id = :groupId and lesson.lessonDate between :from and :to',
        {
          groupId: request.groupId,
          from: request.from,
          to: request.to,
        },
      )
      .addOrderBy('lesson.lessonDate', 'ASC')
      .addOrderBy('lesson.number', 'ASC')
      .getMany();

    return this.mapper.groupAndMap(lessons);
  }

  public async getByTeacher(request: LessonBoardSearchTeacherRequest): Promise<LessonBoardResponseDto[]> {
    const lessons: Lesson[] = await this.repository
      .createQueryBuilder('lesson')
      .innerJoin('teacher', 'teacher')
      .where(
        'teacher.id = :teacherId and lesson.lessonDate between :from and :to',
        {
          teacherId: request.teacherId,
          from: request.from,
          to: request.to,
        },
      )
      .addOrderBy('lesson.lessonDate', 'ASC')
      .addOrderBy('lesson.number', 'ASC')
      .getRawMany();

    return this.mapper.groupAndMap(lessons);
  }

  public async findById(id: string): Promise<LessonResponseDto> {
    return this.mapper.asLessonResponseDto(await super.getById(id));
  }

  protected getEntityName(): string {
    return Lesson.name;
  }

  protected getRepository(): Repository<Lesson> {
    return this.repository;
  }
}
