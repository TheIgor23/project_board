import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put,
	Query,
	DefaultValuePipe
} from '@nestjs/common';
import { ListService } from './list.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ListDto } from './dto/list.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/updateList.dto';

@ApiTags('List')
@Controller('list')
export class ListController {
	constructor(private readonly listService: ListService) {}

	@Post()
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	create(
		@Query('projectId', new DefaultValuePipe('')) projectId: string,
		@Body() createListDto: ListDto
	) {
		return this.listService.create(createListDto, projectId);
	}

	@Get()
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	findAll(@Query('projectId', new DefaultValuePipe('')) projectId: string) {
		return this.listService.findAll(projectId);
	}

	@Get(':id')
	@Auth()
	@HttpCode(200)
	findOne(@Param('id') id: string) {
		return this.listService.findOne(id);
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update-order')
	@Auth()
	updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		return this.listService.updateOrder(updateOrderDto.ids);
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	update(@Param('id') id: string, @Body() updateListDto: ListDto) {
		return this.listService.update(id, updateListDto);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	remove(@Param('id') id: string) {
		return this.listService.remove(id);
	}
}
