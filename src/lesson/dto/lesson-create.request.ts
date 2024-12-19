import { LessonType } from '../domain/lesson-type.enum';
import { ArrayNotEmpty, IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class LessonCreateRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  teacherId: string;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  subjectId: string;
  @ArrayNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  groupIds: string[];
  @IsNumber()
  number: number;
  @IsDate()
  lessonDate: Date;
  @IsString()
  @IsNotEmpty()
  locationName: string;
  @IsEnum(LessonType)
  type: LessonType;
}
