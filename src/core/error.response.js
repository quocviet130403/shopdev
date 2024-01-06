'use strict';

const StatusCodeError = {
    CONFLICT: 409,
    EXSIST: 403,
    CREATED_FAIL: 400,
}

const MessageError = {
    CONFLICT: 'Conflict',
    EXSIST: 'Exsist',
    CREATED_FAIL: 'Created fail',
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

module.exports = {
    ConflictError,
    ExsistError,
    CreatedFailError
}