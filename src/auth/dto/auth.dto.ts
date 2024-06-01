import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@MinLength(5, {
		message: 'Password must be at least 5 characters long'
	})
	@IsString()
	password: string;
}
