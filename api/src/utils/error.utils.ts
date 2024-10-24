export class CreateError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export async function tryCatch<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>]> {
  try {
    const data = await promise;
    return [undefined, data] as [undefined, T];
  } catch (error) {
    if (errorsToCatch == undefined) {
      return [error as InstanceType<E>];
    }
    if (errorsToCatch.some((e) => error instanceof e)) {
      return [error as InstanceType<E>];
    }
    throw error;
  }
}

export enum httpStatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  PartialContent = 206,
  NotCreated = 209,
  NotUpdated = 210,
  NotMatch = 211,
  NotProvided = 212,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  ExpectationFailed = 417,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTiemout = 504,
}

export enum httpMessages {
  Ok = "Ok",
  Created = "Created",
  Accepted = "Accepted",
  NoContent = "No Content",
  PartialContent = "Partial Content", // RFC 7233
  NotCreated = "Not created",
  NotUpdated = "Not updated",
  NotProvided = "Data not provided",
  NotMatch = "Not match",
  MultipleChoices = "Multiple Choices",
  MovedPermanently = "Moved Permanently",
  Found = "Found", // Previously "Moved temporarily"
  BadRequest = "Bad Request",
  Unauthorized = "Unauthorized", // RFC 7235
  PaymentRequired = "Payment Required",
  Forbidden = "Forbidden",
  NotFound = "Not Found",
  MethodNotAllowed = "Method Not Allowed",
  RequestTimeout = "Request Timeout",
  Conflict = "Conflict",
  Gone = "Gone",
  ExpectationFailed = "Expectation Failed",
  UnprocessableEntity = "Unprocessable Entity", // WebDAV; RFC 4918
  TooManyRequests = "Too Many Requests", // RFC 6585
  InternalServerError = "Internal Server Error",
  NotImplemented = "Not Implemented",
  BadGateway = "Bad Gateway",
  ServiceUnavailable = "Service Unavailable",
  GatewayTiemout = "Gateway Timeout",
}

export const httpMessage = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing", // WebDAV; RFC 2518
  103: "Early Hints", // RFC 8297
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information", // since HTTP/1.1
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content", // RFC 7233
  207: "Multi-Status", // WebDAV; RFC 4918
  208: "Already Reported", // WebDAV; RFC 5842
  209: "Not created",
  210: "Not updated",
  211: "Not match",
  212: "Data not provided",
  226: "IM Used", // RFC 3229
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found", // Previously "Moved temporarily"
  303: "See Other", // since HTTP/1.1
  304: "Not Modified", // RFC 7232
  305: "Use Proxy", // since HTTP/1.1
  306: "Switch Proxy",
  307: "Temporary Redirect", // since HTTP/1.1
  308: "Permanent Redirect", // RFC 7538
  400: "Bad Request",
  401: "Unauthorized", // RFC 7235
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required", // RFC 7235
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed", // RFC 7232
  413: "Payload Too Large", // RFC 7231
  414: "URI Too Long", // RFC 7231
  415: "Unsupported Media Type", // RFC 7231
  416: "Range Not Satisfiable", // RFC 7233
  417: "Expectation Failed",
  418: "I'm a teapot", // RFC 2324, RFC 7168
  421: "Misdirected Request", // RFC 7540
  422: "Unprocessable Entity", // WebDAV; RFC 4918
  423: "Locked", // WebDAV; RFC 4918
  424: "Failed Dependency", // WebDAV; RFC 4918
  425: "Too Early", // RFC 8470
  426: "Upgrade Required",
  428: "Precondition Required", // RFC 6585
  429: "Too Many Requests", // RFC 6585
  431: "Request Header Fields Too Large", // RFC 6585
  451: "Unavailable For Legal Reasons", // RFC 7725
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates", // RFC 2295
  507: "Insufficient Storage", // WebDAV; RFC 4918
  508: "Loop Detected", // WebDAV; RFC 5842
  510: "Not Extended", // RFC 2774
  511: "Network Authentication Required", // RFC 6585
};
