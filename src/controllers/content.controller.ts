import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContentService } from '../services/content.service';
import {
  CreateTVShowContentDto,
  CreateMovieContentDto,
} from '../dtos/content/create-content.dto';
import {
  UpdateMovieContentDto,
  UpdateTVShowContentDto,
} from '../dtos/content/update-content.dto';
import { Movie, TVShow } from '../utilities/interfaces/content.interface';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @ApiOperation({ summary: 'Create content' })
  @ApiResponse({
    status: 201,
    description: 'The content has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post(':contentType')
  async create(
    @Body() createContentDto: CreateTVShowContentDto | CreateMovieContentDto,
    @Param('contentType') contentType: 'movie' | 'tvshow',
  ): Promise<Movie | TVShow> {
    return this.contentService.create(contentType, createContentDto);
  }

  @ApiOperation({ summary: 'Get all content' })
  @ApiResponse({ status: 200, description: 'Return all content.' })
  @Get(':contentType')
  async findAll(
    @Param('contentType') contentType: 'movie' | 'tvshow',
  ): Promise<Movie[] | TVShow[]> {
    return this.contentService.findAll(contentType);
  }

  @ApiOperation({ summary: 'Get content by ID' })
  @ApiResponse({ status: 200, description: 'Return content by ID.' })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  @Get(':contentType/:id')
  async findOne(
    @Param('id') id: string,
    @Param('contentType') contentType: 'movie' | 'tvshow',
  ): Promise<Movie | TVShow> {
    return this.contentService.findById(contentType, id);
  }

  @ApiOperation({ summary: 'Update content' })
  @ApiResponse({
    status: 200,
    description: 'The content has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  @Put(':contentType/:id')
  async update(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateMovieContentDto | UpdateTVShowContentDto,
    @Param('contentType') contentType: 'movie' | 'tvshow',
  ): Promise<Movie | TVShow> {
    return this.contentService.update(contentType, id, updateContentDto);
  }

  @ApiOperation({ summary: 'Delete content' })
  @ApiResponse({
    status: 200,
    description: 'The content has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Content not found.' })
  @Delete(':contentType/:id')
  async delete(
    @Param('id') id: string,
    @Param('contentType') contentType: 'movie' | 'tvshow',
  ): Promise<void> {
    return this.contentService.delete(contentType, id);
  }
}
