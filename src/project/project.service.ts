import { Injectable } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: ProjectDto, userId: string) {
		return this.prisma.project.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		});
	}

	findAll(userId: string) {
		return this.prisma.project.findMany({
			where: {
				userId
			}
		});
	}

	findOne(userId: string, id: string) {
		return this.prisma.project.findUnique({
			where: {
				id,
				userId
			},
			include: {
				lists: {
					include: {
						cards: true
					}
				}
			}
		});
	}

	update(userId: string, id: string, dto: Partial<ProjectDto>) {
		return this.prisma.project.update({
			where: {
				userId,
				id
			},
			data: dto
		});
	}

	remove(id: string) {
		return this.prisma.project.delete({
			where: {
				id
			}
		});
	}
}
