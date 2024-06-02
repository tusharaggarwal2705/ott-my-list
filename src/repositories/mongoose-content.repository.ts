import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentRepository } from './content.repository.interface';
import { Movie,TVShow } from '../utilities/interfaces/content.interface';
import { Injectable } from '@nestjs/common';
import { MovieDocument,TVShowDocument,MovieContent,TVShowContent } from '../dbModels/content.schema';

@Injectable()
export class MongooseMovieContentRepository implements ContentRepository {
    constructor(@InjectModel(MovieContent.name) private readonly contentModel: Model<MovieDocument>) {}

    async findAll(): Promise<Movie[]> {
        return this.contentModel.find().exec();
    }

    async findOne(id: string): Promise<Movie> {
        return this.contentModel.findById(id).exec();
    }

    async create(content: Movie): Promise<Movie> {
        const newContent = new this.contentModel(content);
        return newContent.save();
    }

    async update(id: string, content: Partial<Movie>): Promise<Movie> {
        return this.contentModel.findByIdAndUpdate(id, content, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.contentModel.findByIdAndDelete(id).exec();
    }

    async listAll(ids: string[]): Promise<Movie[]>{
        return this.contentModel.find({_id: { $in: ids}}).exec();
    }
}

@Injectable()
export class MongooseTVShowContentRepository implements ContentRepository {
    constructor(@InjectModel(TVShowContent.name) private readonly contentModel: Model<TVShowDocument>) {}

    async findAll(): Promise<TVShow[]> {
        return this.contentModel.find().exec();
    }

    async findOne(id: string): Promise<TVShow> {
        return this.contentModel.findById(id).exec();
    }

    async create(content: TVShow): Promise<TVShow> {
        const newContent = new this.contentModel(content);
        return newContent.save();
    }

    async update(id: string, content: Partial<TVShow>): Promise<TVShow> {
        return this.contentModel.findByIdAndUpdate(id, content, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.contentModel.findByIdAndDelete(id).exec();
    }

    async listAll(ids: string[]): Promise<TVShow[]>{
        return this.contentModel.find({_id: { $in: ids}}).exec();
    }
}
