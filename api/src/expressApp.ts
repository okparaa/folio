import express from "express";
import contentsRouter from "./routes/contents.routes";
import usersRouter from "./routes/users.routes";
import routesRouter from "./routes/routes.routes";
import rolesRouter from "./routes/roles.routes";
import { headers } from "./middlewares/headers.middleware";
import { operationsError } from "./middlewares/operationsError.middleware";
import { globalError } from "./middlewares/globalError.middleware";

const app = express();
app.use(express.json());
app.use(headers);
app.use("/contents", contentsRouter);
app.use("/users", usersRouter);
app.use("/routes", routesRouter);
app.use("/roles", rolesRouter);
app.all("*", operationsError);
app.use(operationsError);
app.use(globalError);

export default app;
