import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({
      email,
    });

    if (userExists) {
      return { message: "User exists!", user: userExists };
    }

    try {
      const user = usersRepository.create({
        email,
      });
      await usersRepository.save(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { UsersService };
