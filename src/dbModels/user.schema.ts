import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Genre } from "../utilities/interfaces/content.interface"

@Schema({ _id: false })
class Preferences {
    @Prop()favouriteGenres?: Genre[];
    @Prop()dislikedGenres?: Genre[];
}

@Schema({ _id: false })
class WatchedHistory {
    @Prop() contentId: string;
    @Prop() watchedOn: Date;
    @Prop() rating?: number
}

@Schema({_id: false})
class LikedContent {
    @Prop() contentId: string;
    @Prop() likedOn: Date
}

@Schema()
export class User {
    @Prop({ required: true }) username: string;
    @Prop() preferences?: Preferences;
    @Prop() watchedHistory?: [WatchedHistory]
    @Prop() likedMovies?: [LikedContent]
    @Prop() likedTvShows?: [LikedContent]
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

