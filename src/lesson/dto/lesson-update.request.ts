import { LessonType } from '../domain/lesson-type.enum';
import { ArrayNotEmpty, IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class LessonUpdateRequest {
  @IsNotEmpty()
  @IsUUID()
  id: string;
  @IsUUID()
  @IsNotEmpty()
  teacherId: string;
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  groupIds: string[];
  @IsNumber()
  @IsNotEmpty()
  number: number;
  @IsDate()
  @IsNotEmpty()
  lessonDate: Date;
  @IsString()
  @IsNotEmpty()
  locationName: string;
  @IsEnum(LessonType)
  @IsNotEmpty()
  type: LessonType;
}
