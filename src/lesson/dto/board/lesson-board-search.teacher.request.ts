import { LessonBoardSearchBaseRequest } from './lesson-board-search.base.request';

export class LessonBoardSearchTeacherRequest extends LessonBoardSearchBaseRequest {
  teacherId: string;
}
