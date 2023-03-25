class MyError extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}


export class MemberNotFound extends MyError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'MemberNotFound'
  }
}