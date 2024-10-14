import express from "express";
import contentsRouter from "./routes/contents.routes";
import usersRouter from "./routes/users.routes";
import routesRouter from "./routes/routes.routes";
import rolesRouter from "./routes/roles.routes";

const app = express();
app.use(express.json());
app.use("/contents", contentsRouter);
app.use("/users", usersRouter);
app.use("/routes", routesRouter);
app.use("/roles", rolesRouter);

export default app;
