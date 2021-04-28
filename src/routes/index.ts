import { Router } from "express";
import { routes as settingsRoutes } from "./settings.routes";
import { routes as usersRoutes } from "./users.routes";
import { routes as messagesRoutes } from "./messages.routes";

const routes = Router();

routes.use(settingsRoutes);

routes.use(usersRoutes);

routes.use(messagesRoutes);

export { routes };
