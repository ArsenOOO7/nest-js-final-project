import { GroupCategory } from '../domain/group-category.enum';
import { GroupType } from '../domain/group-type.enum';

export class GroupUpdateRequest {
  id: string;
  specialtyShortName: string;
  academicYear: number;
  number: number;
  category: GroupCategory;
  type: GroupType;
  name: string;
}
