import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  roleId: number;
}
