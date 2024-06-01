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
	DefaultValuePipe,
	Query,
	Put
} from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateOrderDto } from 'src/list/dto/updateList.dto';

@Controller('card')
export class CardController {
	constructor(private readonly cardService: CardService) {}

	@Post()
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	create(
		@Query('listId', new DefaultValuePipe('')) listId: string,
		@Body() createCardDto: CardDto
	) {
		return this.cardService.create(createCardDto, listId);
	}

	@Get()
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	findAll(@Query('listId', new DefaultValuePipe('')) listId: string) {
		return this.cardService.findAll(listId);
	}

	@Get(':id')
	@Auth()
	@HttpCode(200)
	findOne(@Param('id') id: string) {
		return this.cardService.findOne(id);
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update-order')
	@Auth()
	updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		return this.cardService.updateOrder(updateOrderDto.ids);
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	update(@Param('id') id: string, @Body() updateCardDto: CardDto) {
		return this.cardService.update(id, updateCardDto);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	remove(@Param('id') id: string) {
		return this.cardService.remove(id);
	}
}
