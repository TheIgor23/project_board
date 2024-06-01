import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ListDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	position: number;
}
