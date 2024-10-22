import dotenv from "dotenv";
import expressApp from "./expressApp";
dotenv.config();

const PORT = process.env.PORT || 3000;

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
  console.log(`server up!`);
});
