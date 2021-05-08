import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}
class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    try {
      const connection = this.connectionsRepository.create({
        socket_id,
        user_id,
        admin_id,
        id,
      });

      await this.connectionsRepository.save(connection);

      return connection;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByUserId(user_id: string) {
    try {
      const connection = await this.connectionsRepository.findOne({
        user_id,
      });

      return connection;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { ConnectionsService };
