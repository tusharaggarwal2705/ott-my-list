import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../../utilities/interfaces/content.interface';

class Preferences {
  @ApiProperty()
  favouriteGenres?: Genre[];

  @ApiProperty()
  dislikedGenres?: Genre[];
}

class WatchedHistory {
  @ApiProperty()
  contentId: string;

  @ApiProperty()
  watchedOn: Date;

  @ApiProperty()
  rating?: number;
}

class LikedContent {
  @ApiProperty()
  contentId: string;

  @ApiProperty()
  likedOn: Date;
}

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  preferences?: Preferences;

  @ApiProperty()
  watchedHistory?: WatchedHistory[];

  @ApiProperty()
  likedMovies?: LikedContent[];

  @ApiProperty()
  likedTvShows?: LikedContent[];
}
