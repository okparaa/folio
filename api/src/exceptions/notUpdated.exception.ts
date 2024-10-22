import {
  CreateError,
  httpMessages,
  httpStatusCode,
} from "../utils/error.utils";

export class NotUpdatedException {
  constructor(message: string = httpMessages.NotUpdated) {
    throw new CreateError(httpStatusCode.NotUpdated, message);
  }
}
