import { LessonType } from '../domain/lesson-type.enum';
import { UserResponseDto } from '../../user/dto/user-response-dto';
import { SubjectResponseDto } from '../../subject/dto/subject-response-dto';
import { GroupResponseDto } from '../../group/dto/group-response-dto';

export class LessonResponseDto {
  id: string;
  number: number;
  lessonDate: Date;
  locationName: string;
  type: LessonType;
  teacher: UserResponseDto;
  subject: SubjectResponseDto;
  groups: GroupResponseDto[];
}
