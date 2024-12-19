import { GroupCategory } from '../domain/group-category.enum';
import { GroupType } from '../domain/group-type.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GroupCreateRequest {
  @IsString()
  @IsNotEmpty()
  specialtyShortName: string;
  @IsNumber()
  @IsNotEmpty()
  academicYear: number;
  @IsNumber()
  @IsNotEmpty()
  number: number;
  @IsEnum(GroupCategory)
  @IsNotEmpty()
  category: GroupCategory;
  @IsEnum(GroupType)
  @IsNotEmpty()
  type: GroupType;
  @IsString()
  @IsNotEmpty()
  name: string;
}
