import { Injectable } from '@nestjs/common';
import { Group } from '../domain/group.entity';
import { GroupResponseDto } from '../dto/group-response-dto';
import { GroupUpdateRequest } from "../dto/group-update-request";

@Injectable()
export class GroupMapper {
  public asGroupResponseDto(group: Group): GroupResponseDto {
    return { ...group };
  }

  public applyGroupUpdateRequest(group: Group, request: GroupUpdateRequest): void{
    group.category = request.category;
    group.type = request.type;
    group.name = request.name;
    group.academicYear = request.academicYear;
    group.number = request.number;
    group.specialtyShortName = request.specialtyShortName;
  }

  public asGroupResponseDtos(groups: Group[]): GroupResponseDto[] {
    return groups.map(this.asGroupResponseDto);
  }
}
