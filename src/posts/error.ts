class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class PostExistedError extends HttpError {
  constructor() {
    super(409, 'Post has existed')
  }
}

export class PostsNotFoundError extends HttpError {
  constructor() {
    super(404, 'Posts not found')
  }
}

export class CommentsNotFoundError extends HttpError {
  constructor() {
    super(404, 'Comments not found')
  }
}
