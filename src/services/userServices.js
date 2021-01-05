import { User } from '../database/models';

class UserService {
  static async findUser(param) {
    const user = await User.findOne({
      where: param,
    });
    return user;
  }

  static async createUser(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }

  static async updateUser(param, user) {
    const updatedUser = await User.update(user, {
      where: param,
      returning: true,
      plain: true,
    });
    return updatedUser;
  }
}

export default UserService;
