import dotenv from "dotenv";
import expressApp from "./expressApp";
dotenv.config();

const PORT = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "unknown";

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Listening to: ${PORT}`);
  });
  process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log(`${mode} server up!`);
});
