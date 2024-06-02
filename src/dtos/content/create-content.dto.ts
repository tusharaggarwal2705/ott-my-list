import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../../utilities/interfaces/content.interface';

class ContentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    enum: [
      'Action',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Romance',
      'SciFi',
    ],
  })
  genres: Genre[];
}

export class CreateMovieContentDto extends ContentDto {
  @ApiProperty()
  releasedDate: Date;

  @ApiProperty()
  director: string;

  @ApiProperty()
  actors: string[];
}

class Episode {
  @ApiProperty()
  episodeNumber: number;

  @ApiProperty()
  seasonNumber: number;

  @ApiProperty()
  releasedDate: Date;

  @ApiProperty()
  director: string;

  @ApiProperty()
  actors: string[];
}

export class CreateTVShowContentDto extends ContentDto {
  @ApiProperty()
  episodes: Episode[];
}
