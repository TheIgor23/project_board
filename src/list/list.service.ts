import { Injectable } from '@nestjs/common';
import { ListDto } from './dto/list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: ListDto, projectId: string) {
		return this.prisma.list.create({
			data: {
				...dto,
				project: {
					connect: {
						id: projectId
					}
				}
			}
		});
	}

	findAll(projectId: string) {
		return this.prisma.list.findMany({
			where: {
				projectId: projectId
			},
			orderBy: {
				position: 'asc'
			}
		});
	}

	findOne(id: string) {
		return this.prisma.list.findUnique({
			where: {
				id
			},
			include: {
				cards: true
			}
		});
	}

	update(id: string, dto: Partial<ListDto>) {
		return this.prisma.list.update({
			where: {
				id
			},
			data: dto
		});
	}

	remove(id: string) {
		return this.prisma.list.delete({
			where: {
				id
			}
		});
	}

	async updateOrder(ids: string[]) {
		return this.prisma.$transaction(
			ids.map((id, position) =>
				this.prisma.list.update({
					where: { id },
					data: { position }
				})
			)
		);
	}
}
