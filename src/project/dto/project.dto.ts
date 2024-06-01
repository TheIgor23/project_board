import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProjectDto {
	@ApiProperty()
	@IsString()
	name: string;
}
