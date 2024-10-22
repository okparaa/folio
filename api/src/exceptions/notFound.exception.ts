import {
  CreateError,
  httpMessages,
  httpStatusCode,
} from "../utils/error.utils";

export class NotFoundException {
  constructor(message: string = httpMessages.NotFound) {
    throw new CreateError(httpStatusCode.NotFound, message);
  }
}
