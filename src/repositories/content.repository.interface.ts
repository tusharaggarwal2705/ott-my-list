import { Movie,TVShow } from '../utilities/interfaces/content.interface';

export interface ContentRepository {
    findAll(): Promise<Movie[] | TVShow[]>;
    findOne(id: string): Promise<Movie | TVShow>;
    create(content: Movie|TVShow): Promise<Movie|TVShow>;
    update(id: string, content: Partial<Movie|TVShow>): Promise<Movie|TVShow>;
    delete(id: string): Promise<void>;
    listAll(ids: string[]): Promise<Movie[] | TVShow[]>
}