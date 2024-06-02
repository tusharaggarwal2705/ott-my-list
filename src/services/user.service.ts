import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from 'src/dtos/user/update-user.dto';
import { RedisService } from 'src/modules/redis/redis.service';
import { MongooseMovieContentRepository, MongooseTVShowContentRepository } from 'src/repositories/mongoose-content.repository';
import { UserRepository } from 'src/repositories/user.repository.interface';
import { getSkipLimit } from 'src/utilities/helper';
import { User } from 'src/utilities/interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('MovieContentRepository') private readonly movieRepository: MongooseMovieContentRepository,
        @Inject('TVShowContentRepository') private readonly tvshowRepository: MongooseTVShowContentRepository,
        private readonly redisService:RedisService
    ) { }

    async create(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findById(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        return this.userRepository.update(id, user);
    }

    async delete(id: string): Promise<void> {
        return this.userRepository.delete(id);
    }

    async likeContent(contentType: string, id: string, contentId: string):Promise<User> {

        let userExists: string = await this.redisService.get(id)
        let user:User
        if(!userExists){
            user = await this.userRepository.findOne(id);
            if (!user) throw new NotFoundException('user not found');
            await this.redisService.set(id,JSON.stringify(user));
        }

        const fieldToUpdate = contentType === 'movie' ? 'likedMovies' : 'likedTvShows';
        
        const isValid = await this.validateContentIdExists(contentType, contentId)
        if (!isValid) throw new NotFoundException('contentId not found')

        const existingContent = user[fieldToUpdate]?.find((content) => content.contentId === contentId);
        if (existingContent) {
          return user; // Content already exists, no need to add
        } 

        return this.userRepository.updateLiked(id,contentId,contentType,'add');

    }

    async removelikedContent(contentType: string, id: string, contentId: string):Promise<User> {
        
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException('user not found');
        
        const isValid = await this.validateContentIdExists(contentType, contentId)
        if (!isValid) throw new NotFoundException('contentId not found')

        

        return this.userRepository.updateLiked(id,contentId,contentType,'remove');

    }

    async getLikedContent(id: string, page: number = 1, pageSize?: number):Promise<any>{
        let content = []
        let userExists: string = await this.redisService.get(id)
        let user:User;
        if (!userExists) {
            user = await this.userRepository.findOne(id);
            if (!user) {
                throw new NotFoundException('User not found');
            }
            await this.redisService.set(id, JSON.stringify(user));
        } else {
            user = JSON.parse(userExists);
        }

        let {skip,limit} = getSkipLimit(page,pageSize);

        // Combine liked movies and TV shows arrays into a single array
        const likedContent = [...user.likedMovies, ...user.likedTvShows];

        // Sort the merged array based on the likedOn field
        likedContent.sort((a:any, b:any) => a.likedOn - b.likedOn);

        const pageContent = likedContent.slice(skip, skip + limit);

        const contentIds = pageContent.map(item => item.contentId);

        if(user?.likedMovies?.length){
            let movies = await this.movieRepository.listAll(contentIds);
            content.push(...movies);
        }

        if(user?.likedTvShows?.length){
            let tvshows = await this.tvshowRepository.listAll(contentIds);
            content.push(...tvshows);
        }

        return content;
    }

    async validateContentIdExists(contentType: string, contentId: string): Promise<Boolean> {
        let isValid = false;
        if(contentType == 'movie'){
            let content = await this.movieRepository.findOne(contentId)
            if(content) return true
        }else if(contentType == 'tvshow'){
            let content = await this.tvshowRepository.findOne(contentId)
            if(content) return true
        }
        return isValid;
    }

}
