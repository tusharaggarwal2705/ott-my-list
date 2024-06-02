import { MovieSchema, TVShowSchema } from "../src/dbModels/content.schema"
import { UserSchema } from "../src/dbModels/user.schema"
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

async function createSampleData() { 

    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@my-cluster.yw89x0n.mongodb.net/`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const UserModel = mongoose.model('User', UserSchema);
    const MovieModel = mongoose.model('MovieContent', MovieSchema);
    const TVShowModel = mongoose.model('TVShowContent', TVShowSchema); 

    const movies = Array.from({ length: 100 }).map((_, index) => ({
        title: `Movie Title ${index + 1}`,
        description: `Description for Movie ${index + 1}`,
        genres: ['Action', 'Drama'],
        releasedDate: new Date(),
        director: `Director ${index + 1}`,
        actors: [`Actor A`, `Actor B`],
    }));

    // Create 100 unique TV shows
    const tvShows = Array.from({ length: 100 }).map((_, index) => ({
        title: `TV Show Title ${index + 1}`,
        description: `Description for TV Show ${index + 1}`,
        genres: ['Comedy', 'Horror'],
        episodes: [
            {
                episodeNumber: 1,
                seasonNumber: 1,
                releasedDate: new Date(),
                actors: [`Actor X`, `Actor Y`],
                director: `Director ${index + 1}`,
            },
        ],
    }));

    await MovieModel.insertMany(movies);
    await TVShowModel.insertMany(tvShows);

    const users = Array.from({ length: 10 }).map((_, index) => ({
        username: `user_${index + 1}`,
        preferences: {
          favouriteGenres: ['Action', 'Drama'],
          dislikedGenres: ['Romance'],
        },
      }));
  
      // Insert users
      await UserModel.insertMany(users);

    await mongoose.disconnect()
}

createSampleData();

