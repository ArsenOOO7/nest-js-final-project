import { LessonType } from '../domain/lesson-type.enum';

export class LessonCreateRequest {
  teacherId: string;
  subjectId: string;
  groupIds: string[];
  number: number;
  lessonDate: Date;
  locationName: string;
  type: LessonType;
}
