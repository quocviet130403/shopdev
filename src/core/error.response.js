'use strict';

const StatusCodeError = {
    CONFLICT: 409,
    EXSIST: 403,
    CREATED_FAIL: 400,
    NOT_FOUND: 404,
}

const MessageError = {
    CONFLICT: 'Conflict',
    EXSIST: 'Exsist',
    CREATED_FAIL: 'Created fail',
    NOT_FOUND: 'Not found',
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

module.exports = {
    ConflictError,
    ExsistError,
    CreatedFailError,
    NotFoundError
}