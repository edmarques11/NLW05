import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;

    const messagesService = new MessagesService();

    try {
      const message = await messagesService.create({
        admin_id,
        text,
        user_id,
      });

      return response.status(201).json(message);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async showByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messagesService = new MessagesService();

    try {
      const list = await messagesService.listByUser(id);
      response.status(200).json(list);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { MessagesController };
