export type Genre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Romance'
  | 'SciFi';

export interface Content {
  title: string;
  description: string;
  genres: Genre[];
}

export interface Movie extends Content {
  releasedDate: Date;
  director: string;
  actors: string[];
}

interface Episode {
  episodeNumber: number;
  seasonNumber: number;
  releasedDate: Date;
  director: string;
  actors: string[];
}

export interface TVShow extends Content {
  episodes: Episode[];
}
