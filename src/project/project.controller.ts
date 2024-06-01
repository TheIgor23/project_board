import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Put
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	create(
		@CurrentUser('id') userId: string,
		@Body() createProjectDto: ProjectDto
	) {
		return this.projectService.create(createProjectDto, userId);
	}

	@Get()
	@Auth()
	@HttpCode(200)
	findAll(@CurrentUser('id') userId: string) {
		return this.projectService.findAll(userId);
	}

	@Get(':id')
	@Auth()
	@HttpCode(200)
	findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.projectService.findOne(userId, id);
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	update(
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
		@Body() updateProjectDto: ProjectDto
	) {
		return this.projectService.update(userId, id, updateProjectDto);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	remove(@Param('id') id: string) {
		return this.projectService.remove(id);
	}
}
