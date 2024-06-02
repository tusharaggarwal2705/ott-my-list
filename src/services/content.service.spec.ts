import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { ContentRepository } from '../repositories/content.repository.interface';
import { Movie, TVShow } from 'src/utilities/interfaces/content.interface';

describe('ContentService', () => {
  let service: ContentService;
  let movieRepository: Partial<ContentRepository>;
  let tvshowRepository: Partial<ContentRepository>;

  beforeEach(async () => {
    movieRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    tvshowRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        { provide: 'MovieContentRepository', useValue: movieRepository },
        { provide: 'TVShowContentRepository', useValue: tvshowRepository },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should find all movie content', async () => {
      await service.findAll('movie');
      expect(movieRepository.findAll).toHaveBeenCalled();
    });

    it('should find all TV show content', async () => {
      await service.findAll('tvshow');
      expect(tvshowRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find movie content by ID', async () => {
      const movieId = 'movieId';
      await service.findById('movie', movieId);
      expect(movieRepository.findOne).toHaveBeenCalledWith(movieId);
    });

    it('should find TV show content by ID', async () => {
      const tvshowId = 'tvshowId';
      await service.findById('tvshow', tvshowId);
      expect(tvshowRepository.findOne).toHaveBeenCalledWith(tvshowId);
    });
  });

  describe('update', () => {
    it('should update movie content', async () => {
      const movieId = 'movieId';
      const updatedMovie: Partial<Movie> = { title: 'Updated Movie' };
      await service.update('movie', movieId, updatedMovie);
      expect(movieRepository.update).toHaveBeenCalledWith(movieId, updatedMovie);
    });

    it('should update TV show content', async () => {
      const tvshowId = 'tvshowId';
      const updatedTVShow: Partial<TVShow> = { title: 'Updated TV Show' };
      await service.update('tvshow', tvshowId, updatedTVShow);
      expect(tvshowRepository.update).toHaveBeenCalledWith(tvshowId, updatedTVShow);
    });
  });

  describe('delete', () => {
    it('should delete movie content', async () => {
      const movieId = 'movieId';
      await service.delete('movie', movieId);
      expect(movieRepository.delete).toHaveBeenCalledWith(movieId);
    });

    it('should delete TV show content', async () => {
      const tvshowId = 'tvshowId';
      await service.delete('tvshow', tvshowId);
      expect(tvshowRepository.delete).toHaveBeenCalledWith(tvshowId);
    });
  });
});
