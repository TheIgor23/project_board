import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiProperty()
	@IsOptional()
	username?: string;

	@ApiProperty()
	@IsOptional()
	@MinLength(5, {
		message: 'Password must be at least 5 characters long'
	})
	@IsString()
	hash_password?: string;
}
