class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class TagsNotFoundError extends HttpError {
  constructor() {
    super(404, 'Tag Not Found')
  }
}