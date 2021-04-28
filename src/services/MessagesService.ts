import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, text, user_id }: IMessageCreate) {
    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    try {
      await this.messagesRepository.save(message);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async listByUser(user_id: string) {
    try {
      const list = await this.messagesRepository.find({
        where: { user_id },
        relations: ["user"],
      });
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { MessagesService };
