import {
  CreateError,
  httpMessages,
  httpStatusCode,
} from "../utils/error.utils";

export class NotMatchException {
  constructor(message: string = httpMessages.NotMatch) {
    throw new CreateError(httpStatusCode.NotMatch, message);
  }
}
