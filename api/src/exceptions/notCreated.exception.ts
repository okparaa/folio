import {
  CreateError,
  httpMessages,
  httpStatusCode,
} from "../utils/error.utils";

export class NotCreatedException {
  constructor(message: string = httpMessages.NotCreated) {
    throw new CreateError(httpStatusCode.NotCreated, message);
  }
}
