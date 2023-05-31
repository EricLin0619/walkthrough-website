class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class CommentNotFoundError extends HttpError {
  constructor() {
    super(404, 'Comment not found')
  }
}

