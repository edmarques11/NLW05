import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsServices {
  async create({ chat, username }: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const userAlreadExists = await settingsRepository.findOne({
      username,
    });

    if (userAlreadExists) {
      throw new Error("User alread exists!");
    }

    const settings = settingsRepository.create({
      chat,
      username,
    });

    try {
      await settingsRepository.save(settings);
      return settings;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { SettingsServices };
