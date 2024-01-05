'use strict';

const StatusCodeError = {
    CONFLICT: 409,
    EXSIST: 403,
}

const MessageError = {
    CONFLICT: 'Conflict',
    EXSIST: 'Exsist',
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

module.exports = {
    ConflictError,
    ExsistError
}