import { Repository, getCustomRepository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsCreate) {
    try {
    const userAlreadExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadExists) {
      throw new Error("User alread exists!");
    }

    const settings = this.settingsRepository.create({
      chat,
      username,
    });

      await this.settingsRepository.save(settings);
      return settings;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { SettingsService };
