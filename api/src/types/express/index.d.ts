import { JwtPayload } from "jsonwebtoken";
import { User } from "../../schemas/users.schema";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_REAL_URL: string;
      DATABASE_TEST_URL: string;
      NODE_ENV: string;
      TOKEN_SECRET?: string;
      REFRESH_SECRET?: string;
      PORT: string;
      BCRYPT_COST: string;
      PAYSTACK_PUBLIC_KEY: string;
    }
  }
}
