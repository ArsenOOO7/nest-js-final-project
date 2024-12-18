import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserMapper } from '../../user/mapper/user.mapper';
import { GroupMapper } from '../../group/mapper/group.mapper';
import { Lesson } from '../domain/lesson.entity';
import { LessonResponseDto } from '../dto/lesson-response.dto';
import { LessonCreateRequest } from "../dto/lesson-create.request";
import { User } from "../../user/domain/user.entity";
import { Subject } from "../../subject/domain/subject.entity";
import { Group } from "../../group/domain/group.entity";
import { LessonUpdateRequest } from "../dto/lesson-update.request";
import { UserResponseDto } from "../../user/dto/user-response-dto";

@Injectable()
export class LessonMapper {
  constructor(
    @Inject() private readonly userMapper: UserMapper,
    @Inject() private readonly groupMapper: GroupMapper,
  ) {}

  public asLessonResponseDto(lesson: Lesson): LessonResponseDto {
    return {
      id: lesson.id,
      number: lesson.number,
      lessonDate: lesson.lessonDate,
      type: lesson.type,
      locationName: lesson.locationName,
      teacher: this.userMapper.asUserResponseDto(lesson.teacher),
      subject: {
        id: lesson.subject.id,
        name: lesson.subject.name,
      },
      groups: this.groupMapper.asGroupResponseDtos(lesson.groups),
    };
  }

  public asLessonResponseDtos(lessons: Lesson[]): LessonResponseDto[] {
    const array = [];
    for (let i = 0; i < lessons.length; ++i) {
      array.push(this.asLessonResponseDto(lessons[i]));
    }
    return array;
  }

  public asLesson(request: LessonCreateRequest, user: User, subject: Subject, groups: Group[]): Lesson {
    return {
      number: request.number,
      locationName: request.locationName,
      lessonDate: request.lessonDate,
      type: request.type,
      teacher: user,
      subject: subject,
      groups: groups,
      id: undefined,
    };
  }

  public applyLessonUpdateRequest(request: LessonUpdateRequest, user: User, subject: Subject, groups: Group[], lesson: Lesson) : void {
    lesson.locationName = request.locationName;
    lesson.lessonDate = request.lessonDate;
    lesson.number = request.number;
    lesson.type = request.type;
    lesson.teacher = user;
    lesson.subject = subject;
    lesson.groups = groups;
  }

  public groupAndMap(lessons: Lesson[]) {
    const groupedLessons: Record<string, Lesson[]> = lessons.reduce(
      (acc, lesson) => {
        const dateKey = lesson.lessonDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(lesson);
        return acc;
      },
      {} as Record<string, Lesson[]>,
    );

    return Object.entries(groupedLessons).map(([date, lessons]) => ({
      date: new Date(date),
      lessons: this.asLessonResponseDtos(lessons),
    }));
  }
}
