import {
	Controller,
	Get,
	Body,
	Param,
	UsePipes,
	ValidationPipe,
	Put,
	HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	@Auth()
	findOne(@Param('id') id: string) {
		return this.userService.getById(id);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put()
	@Auth()
	async updateUser(@CurrentUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.update(id, dto);
	}
}
