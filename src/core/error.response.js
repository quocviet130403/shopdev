'use strict';

const StatusCodeError = {
    CONFLICT: 409,
    EXSIST: 403,
    CREATED_FAIL: 400,
    NOT_FOUND: 404,
    AUTH_FAILED: 401,
    BAD_REQUEST: 400
}

const MessageError = {
    CONFLICT: 'Conflict',
    EXSIST: 'Exsist',
    CREATED_FAIL: 'Created fail',
    NOT_FOUND: 'Not found',
    AUTH_FAILED: 'Auth failed',
    BAD_REQUEST: 'Bad request'
}

class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ConflictError extends ErrorResponse {
  constructor(message = StatusCodeMessage.CONFLICT, statusCode = StatusCodeError.CONFLICT) {
    super(statusCode, message);
  }
}

class ExsistError extends ErrorResponse {
  constructor(message = StatusCodeMessage.EXSIST, statusCode = StatusCodeError.EXSIST) {
    super(statusCode, message);
  }
}

class CreatedFailError extends ErrorResponse {
  constructor(message = StatusCodeMessage.CREATED_FAIL, statusCode = StatusCodeError.CREATED_FAIL) {
    super(statusCode, message);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = StatusCodeMessage.NOT_FOUND, statusCode = StatusCodeError.NOT_FOUND) {
    super(statusCode, message);
  }
}

class AuthFailed extends ErrorResponse {
  constructor(message = StatusCodeMessage.AUTH_FAILED, statusCode = StatusCodeError.AUTH_FAILED) {
    super(statusCode, message);
  }
}

class BadRequest extends ErrorResponse {
  constructor(message = StatusCodeMessage.BAD_REQUEST, statusCode = StatusCodeError.BAD_REQUEST) {
    super(statusCode, message);
  }
}

module.exports = {
    ConflictError,
    ExsistError,
    CreatedFailError,
    NotFoundError,
    AuthFailed,
    BadRequest
}