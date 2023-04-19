class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UserNotFoundError extends HttpError {
  constructor() {
    super(404, 'User Not Found');
  }
}

export class UserExistedError extends HttpError {
  constructor() {
    super(409, 'User has existed')
  }
}