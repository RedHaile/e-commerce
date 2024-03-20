// helper/error
// custom error
// Error

// Error: type of error
export class ApiError extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super();
  }
}

// cant find smt
export class NotFoundError extends ApiError {
  constructor(readonly message: string = "Not Found") {
    super(404, message);
  }
}

// 403: admin
export class ForbiddenError extends ApiError {
  constructor(readonly message: string = "Forbidden") {
    super(403, message);
  }
}
// new ForbiddenError("You are not an admin")
// new ForbiddenError("You dont have permission to create new product")

// 401: token is expire/ dont log in

export class UnauthorizedError extends ApiError {
  constructor(readonly message: string = "Unauthorized request") {
    super(401, message);
  }
}

// 500: network,
export class InternalServerError extends ApiError {
  constructor(readonly message: string = "Internal Server Error") {
    super(500, message);
  }
}

// 400
export class BadRequest extends ApiError {
  constructor(readonly message: string = "Bad request") {
    super(400, message);
  }
}