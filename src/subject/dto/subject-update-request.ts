import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SubjectUpdateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
