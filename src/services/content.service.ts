import { Inject, Injectable } from '@nestjs/common';
import { Movie, TVShow } from 'src/utilities/interfaces/content.interface';
import { ContentRepository } from '../repositories/content.repository.interface';

@Injectable()
export class ContentService {
  constructor(
    @Inject('MovieContentRepository')
    private readonly movieContentRepository: ContentRepository,
    @Inject('TVShowContentRepository')
    private readonly tvshowContentRepository: ContentRepository,
  ) {}

  private getRepository(contentType: 'movie' | 'tvshow'): ContentRepository {
    if (contentType === 'movie') {
      return this.movieContentRepository;
    } else if (contentType === 'tvshow') {
      return this.tvshowContentRepository;
    }
    throw new Error('Invalid content type');
  }

  async create(
    contentType: 'movie' | 'tvshow',
    content: Movie | TVShow,
  ): Promise<Movie | TVShow> {
    const repository = this.getRepository(contentType);
    return repository.create(content);
  }

  async findAll(contentType: 'movie' | 'tvshow'): Promise<Movie[] | TVShow[]> {
    const repository = this.getRepository(contentType);
    return repository.findAll();
  }

  async findById(
    contentType: 'movie' | 'tvshow',
    id: string,
  ): Promise<Movie | TVShow> {
    const repository = this.getRepository(contentType);
    return repository.findOne(id);
  }

  update(
    contentType: 'movie' | 'tvshow',
    id: string,
    content: Partial<Movie | TVShow>,
  ): Promise<Movie | TVShow> {
    const repository = this.getRepository(contentType);
    return repository.update(id, content);
  }

  delete(contentType: 'movie' | 'tvshow', id: string): Promise<void> {
    const repository = this.getRepository(contentType);
    return repository.delete(id);
  }
}
