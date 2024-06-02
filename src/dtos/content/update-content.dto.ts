import { PartialType } from '@nestjs/swagger';
import { CreateMovieContentDto, CreateTVShowContentDto } from './create-content.dto';

export class UpdateTVShowContentDto extends PartialType(CreateTVShowContentDto) {}

export class UpdateMovieContentDto extends PartialType(CreateMovieContentDto) {}
