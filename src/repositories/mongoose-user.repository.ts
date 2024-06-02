import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './user.repository.interface';
import { User } from '../utilities/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '../dbModels/user.schema';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    return new this.userModel(user).save();
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async updateLiked(
    id: string,
    contentId: string,
    contentType: string,
    updateType: 'add' | 'remove',
  ) {
    const fieldToUpdate =
      contentType === 'movie' ? 'likedMovies' : 'likedTvShows';
    if (updateType === 'add') {
      const likedContentObject = {
        contentId,
        likedOn: new Date(),
      };
      return await this.userModel.findOneAndUpdate(
        { _id: id },
        { $addToSet: { [fieldToUpdate]: likedContentObject } },
        { new: true },
      );
    } else if (updateType == 'remove') {
      return await this.userModel.findOneAndUpdate(
        { _id: id },
        { $pull: { [fieldToUpdate]: { contentId } } },
        { new: true },
      );
    }
  }
}
