import { Genre } from './content.interface';

interface WatchedHistory {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}

interface LikedContent {
  contentId: string;
  likedOn: Date;
}

export interface User {
  username: string;
  preferences?: {
    favouriteGenres?: Genre[];
    dislikedGenres?: Genre[];
  };
  watchedHistory?: WatchedHistory[];
  likedMovies?: LikedContent[];
  likedTvShows?: LikedContent[];
}
