import { User, IUser } from '../models/user.model';

export class UserRepository {
  async create(payload: Partial<IUser>) {
    return User.create(payload);
  }

  async findByEmail(email: string) {
    return User.findOne({ email }).exec();
  }

  async findById(id: string) {
    return User.findById(id).exec();
  }

  async setRefreshHash(userId: string, hash: string | null) {
    return User.findByIdAndUpdate(userId, { refreshTokenHash: hash }, { new: true }).exec();
  }
}
