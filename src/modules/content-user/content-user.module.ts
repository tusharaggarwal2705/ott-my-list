import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MovieContent,
  MovieSchema,
  TVShowContent,
  TVShowSchema,
} from '../../dbModels/content.schema';
import { ContentService } from '../../services/content.service';
import {
  MongooseMovieContentRepository,
  MongooseTVShowContentRepository,
} from '../../repositories/mongoose-content.repository';
import { ContentController } from '../../controllers/content.controller';
import { UserService } from '../../services/user.service';
import { User, UserSchema } from '../../dbModels/user.schema';
import { UserController } from '../../controllers/user.controller';
import { MongooseUserRepository } from '../../repositories/mongoose-user.repository';
import { RedisModule } from '../redis/redis.module';

@Module({ 
  imports: [
    MongooseModule.forFeature([ 
      { name: MovieContent.name, schema: MovieSchema },
      { name: TVShowContent.name, schema: TVShowSchema },
      { name: User.name, schema: UserSchema },
    ]),
    RedisModule,
  ],
  controllers: [ContentController, UserController],
  providers: [
    ContentService,
    UserService,
    {
      provide: 'MovieContentRepository',
      useClass: MongooseMovieContentRepository,
    },
    {
      provide: 'TVShowContentRepository',
      useClass: MongooseTVShowContentRepository,
    },
    { provide: 'UserRepository', useClass: MongooseUserRepository },
  ],
  exports: [ContentService, UserService],
})
export class ContentUserModule {}
