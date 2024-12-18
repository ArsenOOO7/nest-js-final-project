import { LessonResponseDto } from '../lesson-response.dto';

export class LessonBoardResponseDto {
  date: Date;
  lessons: LessonResponseDto[];
}
