import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CardDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	position: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	isActive: boolean;
}
