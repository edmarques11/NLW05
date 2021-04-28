import { Router } from "express";
import { MessagesController } from "../controllers/MessagesController";

const routes = Router();

const messagesController = new MessagesController();

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

export { routes };
