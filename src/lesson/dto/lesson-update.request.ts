import { LessonType } from '../domain/lesson-type.enum';

export class LessonUpdateRequest {
  id: string;
  teacherId: string;
  subjectId: string;
  groupIds: string[];
  number: number;
  lessonDate: Date;
  locationName: string;
  type: LessonType;
}
