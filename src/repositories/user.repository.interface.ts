import { User } from '../utilities/interfaces/user.interface';

export interface UserRepository {
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(User: User): Promise<User>;
    update(id: string, User: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    updateLiked(id:string, contentId: string, contentType: string,updateType: string);
}