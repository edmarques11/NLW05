import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    const userExists = await this.usersRepository.findOne({
      email,
    });

    if (userExists) {
      return { message: "User exists!", user: userExists };
    }

    try {
      const user = this.usersRepository.create({
        email,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { UsersService };
