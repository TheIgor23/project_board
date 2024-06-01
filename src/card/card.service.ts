import { Injectable } from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: CardDto, listId: string) {
		return this.prisma.card.create({
			data: {
				...dto,
				list: {
					connect: {
						id: listId
					}
				}
			}
		});
	}

	findAll(listId: string) {
		return this.prisma.card.findMany({
			where: {
				listId: listId
			},
			orderBy: {
				position: 'asc'
			}
		});
	}

	findOne(id: string) {
		return this.prisma.card.findUnique({
			where: {
				id
			}
		});
	}

	update(id: string, dto: Partial<CardDto>) {
		return this.prisma.card.update({
			where: {
				id
			},
			data: dto
		});
	}

	remove(id: string) {
		return this.prisma.card.delete({
			where: {
				id
			}
		});
	}

	async updateOrder(ids: string[]) {
		return this.prisma.$transaction(
			ids.map((id, position) =>
				this.prisma.card.update({
					where: { id },
					data: { position }
				})
			)
		);
	}
}
