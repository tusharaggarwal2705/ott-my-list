import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Genre } from '../utilities/interfaces/content.interface';

export type MovieDocument = MovieContent & Document;
export type TVShowDocument = TVShowContent & Document;
@Schema()
export class Content {
    @Prop() title: string;
    @Prop() description: string;
    @Prop() genres: [Genre]
}

@Schema({})
export class MovieContent extends Content {
    @Prop({required: true}) releasedDate: Date;
    @Prop({required: true}) director: string;
    @Prop({required: true}) actors: string[]
}

@Schema({})
export class Episode {
    @Prop({required: true}) episodeNumber: number;
    @Prop({required: true}) seasonNumber: number;
    @Prop({required: true}) releasedDate: Date;
    @Prop({required: true}) actors: string[];
    @Prop({required: true}) director: string;
}

@Schema({})
export class TVShowContent extends Content{
    @Prop() episodes : [Episode]
}

export const MovieSchema = SchemaFactory.createForClass(MovieContent);
export const TVShowSchema = SchemaFactory.createForClass(TVShowContent);


