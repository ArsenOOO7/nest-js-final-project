import { IsNotEmpty, IsString } from "class-validator";

export class SubjectCreateRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}
